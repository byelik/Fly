#pragma strict

/**
 * Basic class for controlling Camera movement
 */
class CameraFollow extends MonoBehaviour
{
	@SerializeField
	private var xMargin:float = 1f;		// Distance in the x axis the player can move before the camera follows.
	@SerializeField
	private var yMargin:float = 1f;		// Distance in the y axis the player can move before the camera follows.
	@SerializeField
	private var xSmooth:float = 8f;		// How smoothly the camera catches up with it's target movement in the x axis.
	@SerializeField
	private var ySmooth:float = 8f;		// How smoothly the camera catches up with it's target movement in the y axis.
	@SerializeField
	private var maxXAndY:Vector2;		// The maximum x and y coordinates the camera can have.
	@SerializeField
	private var minXAndY:Vector2;		// The minimum x and y coordinates the camera can have.


	private var mPlayer:Transform;		// Reference to the player's transform.


	function Awake()
	{
		// Setting up the reference.
		if(GameObject.FindGameObjectWithTag("Player"))
		{
			mPlayer = GameObject.FindGameObjectWithTag("Player").transform;
		}
		else
		{
			Debug.LogError("Can't find the player on the scene");
		}
	}


	private function checkXMargin():boolean
	{
		// Returns true if the distance between the camera and the player in the x axis is greater than the x margin.
		return Mathf.Abs(transform.position.x - mPlayer.position.x) > xMargin;
	}


	private function checkYMargin():boolean
	{
		// Returns true if the distance between the camera and the player in the y axis is greater than the y margin.
		return Mathf.Abs(transform.position.y - mPlayer.position.y) > yMargin;
	}

	/**
	 * Called every frame
	 */
	function Update()
	{
		trackPlayer();
	}
	
	/**
	 * Track the player on the screen
	 */
	function trackPlayer()
	{
		// By default the target x and y coordinates of the camera are it's current x and y coordinates.
		var targetX:float = transform.position.x;
		var targetY:float = transform.position.y;

		// If the player has moved beyond the x margin...
		if(checkXMargin())
		{	
			// ... the target x coordinate should be a Lerp between the camera's current x position and the player's current x position.
			targetX = Mathf.Lerp(transform.position.x, mPlayer.position.x, xSmooth * Time.deltaTime);
		}
		// If the player has moved beyond the y margin...
		if(checkYMargin())
		{
			// ... the target y coordinate should be a Lerp between the camera's current y position and the player's current y position.
			targetY = Mathf.Lerp(transform.position.y, mPlayer.position.y, ySmooth * Time.deltaTime);
		}

		// The target x and y coordinates should not be larger than the maximum or smaller than the minimum.
		targetX = Mathf.Clamp(targetX, minXAndY.x, maxXAndY.x);
		targetY = Mathf.Clamp(targetY, minXAndY.y, maxXAndY.y);

		// Set the camera's position to the target position with the same z component.
		transform.position = new Vector3(targetX, targetY, transform.position.z);
	}
}
