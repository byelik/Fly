#pragma strict

/**
 * Basic class to controll projectill
 */
class ProjectileDraging extends MonoBehaviour
{
	@SerializeField
	private var maxStretch:float = 3.0f;
	
	@SerializeField
	private var catapultLineFront:LineRenderer;
	@SerializeField
	private var catapultLineBack:LineRenderer;
	
	private var catapult:Transform;
	
	private var mSpring:SpringJoint2D;
	private var mIsClickedOn:boolean;
	private var mRayToMouse:Ray;
	private var mLeftCatapultToProjectile:Ray;
	private var mMaxStretchSqr:float = 3.0f;
	private var mCircleRadius:float;
	private var mPrevVelocity:Vector2;
	
	/**
	 * Called before Start
	 */
	function Awake()
	{
		mSpring = GetComponent.<SpringJoint2D>();
		catapult = mSpring.connectedBody.transform;
	}
	
	/**
	 * Called before first Update
	 */
	function Start()
	{
		lineRendererSetup();
		mRayToMouse = new Ray(catapult.position, Vector3.zero);
		mLeftCatapultToProjectile = new Ray(catapultLineFront.transform.position, Vector3.zero);
		mMaxStretchSqr = maxStretch * maxStretch;
		var circle:CircleCollider2D = collider2D as CircleCollider2D;
		mCircleRadius = circle.radius;
	}
	
	/**
	 * Called every frame
	 */
	function Update()
	{
		if (mIsClickedOn)
		{
			dragging();
		}
		
		if(mSpring != null) 
		{
			if (!rigidbody2D.isKinematic && mPrevVelocity.sqrMagnitude > rigidbody2D.velocity.sqrMagnitude)
			{
				Destroy(mSpring);
				rigidbody2D.velocity = mPrevVelocity;
			}
			
			if (!mIsClickedOn)
			{
				mPrevVelocity = rigidbody2D.velocity;
			}
			lineRendererUpdate();
			
		} 
		else 
		{
			catapultLineFront.enabled = false;
			catapultLineBack.enabled = false;
		}
	}
	
	private function lineRendererSetup()
	{
		catapultLineFront.SetPosition(0, catapultLineFront.transform.position);
		catapultLineBack.SetPosition(0, catapultLineBack.transform.position);
		
		catapultLineFront.sortingLayerName = "Foreground";
		catapultLineBack.sortingLayerName = "Foreground";
		
		catapultLineFront.sortingOrder = 3;
		catapultLineBack.sortingOrder = 1;
	}
	
	private function lineRendererUpdate()
	{
		var catapultToProjectile:Vector2 = transform.position - catapultLineFront.transform.position;
		mLeftCatapultToProjectile.direction = catapultToProjectile;
		var holdPoint:Vector3 = mLeftCatapultToProjectile.GetPoint(catapultToProjectile.magnitude + mCircleRadius);
		
		catapultLineFront.SetPosition(1, holdPoint);
		catapultLineBack.SetPosition(1, holdPoint);
	}
	
	function OnMouseDown()
	{
		mSpring.enabled = false;
		mIsClickedOn = true;
	}
	
	function OnMouseUp()
	{
		mSpring.enabled = true;
		rigidbody2D.isKinematic = false;
		mIsClickedOn = false;
	}
	
	private function dragging()
	{
		var mouseWorldPoint:Vector3 = Camera.main.ScreenToWorldPoint(Input.mousePosition);
		var catapultToMouse:Vector2 = mouseWorldPoint - catapult.position;
		mouseWorldPoint.z = 0.0f;
		if(catapultToMouse.sqrMagnitude > mMaxStretchSqr)
		{
			mRayToMouse.direction = catapultToMouse;
			mouseWorldPoint = mRayToMouse.GetPoint(maxStretch);
		}
		transform.position = mouseWorldPoint;
	}
	
	function OnCollisionEnter2D(collision:Collision2D) 
	{
		if(collision.collider.tag == "Ground")
		{
			particleSystem.Play();
		}
	}
	
}