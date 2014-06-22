#pragma strict

@ExecuteInEditMode
/**
 * Basic class for controlling character
 */
class CharacterControll extends MonoBehaviour
{
	@SerializeField
	private var leftTurnBtnRect:Rect = Rect(0, 0, 0, 0);
	private var mLeftTurnBtnRect:Rect;
	
	@SerializeField
	private var rightTurnBtnRect:Rect = Rect(0, 0, 0, 0);
	private var mRightTurnBtnRect:Rect;
	
	@SerializeField
	private var speed:float = 5.0f;
	
	private var mPlayerAnimatior:Animator;
	
	/**
	 * Called before first Update
	 */
	function Start()
	{
		mPlayerAnimatior = GetComponent.<Animator>();
		OnValidate();
	}

	/**
	 * Called in Editor mode only
	 */
	function OnValidate()
	{
		mLeftTurnBtnRect = ScreenController.convertRect(leftTurnBtnRect);
		mLeftTurnBtnRect.y = Screen.height - mLeftTurnBtnRect.height - mLeftTurnBtnRect.y;
		
		mRightTurnBtnRect = ScreenController.convertRect(rightTurnBtnRect);
		mRightTurnBtnRect.x = Screen.width - mRightTurnBtnRect.width - mRightTurnBtnRect.x;
		mRightTurnBtnRect.y = Screen.height - mRightTurnBtnRect.height - mRightTurnBtnRect.y;
	}
	
	function OnGUI()
	{
		if(GUI.Button(mLeftTurnBtnRect, "Left"))
		{
			//Call some function
			rotateCharacter();
		}
		if(GUI.Button(mRightTurnBtnRect, "Right"))
		{
			//Call some function
			rotateCharacter();
		}
	}
	
	public var minAngle:float = 0.0F;
    public var maxAngle:float = 90.0F;
    private var angle:float;
    
    function FixedUpdate()
    {
    	// The Speed animator parameter is set to the absolute value of the horizontal input.
		mPlayerAnimatior.SetFloat("Speed", Mathf.Abs(speed));
		rigidbody2D.velocity = new Vector2(speed, rigidbody2D.velocity.y);
    }
    
    function Update()
    {
        angle = Mathf.LerpAngle(minAngle, maxAngle, Time.time);
        print(angle);
    }
	
	private function rotateCharacter()
	{
		transform.eulerAngles = new Vector3(0, 0, angle);
	}
}