#pragma strict

/**
 * Basic class for starting the game
 */
@ExecuteInEditMode
class StartGame extends MonoBehaviour
{
	//Start btn Rect
	@SerializeField
	private var startBtnRect:Rect = Rect(0,0, 50, 30);
	private var mStartBtnRect:Rect;

	/**
	 * Called before the first Update
	 */
	function Start()
	{
		OnValidate();
	}
	
	/**
	 * Called in Editor mode only
	 */
	function OnValidate()
	{
		mStartBtnRect = ScreenController.convertRect(startBtnRect);
		mStartBtnRect.x = (Screen.width - mStartBtnRect.width) / 2;
		mStartBtnRect.y = (Screen.height - mStartBtnRect.height) / 2;
	}
	
	/**
	 * Draw UI
	 */
	function OnGUI()
	{
		//Button handler
		if(GUI.Button(mStartBtnRect, "Start"))
		{
			//Load the game scene
			Application.LoadLevel("Game");
		}
	}
}