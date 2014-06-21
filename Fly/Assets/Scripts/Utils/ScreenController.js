#pragma strict

class ScreenController
{
	private static final var DEFAULT_WIDTH:uint = 1024;
	private static final var DEFAULT_HEIGHT:uint = 768;
	private static var msScale:float;
	private static var msScaleMax:float;
	private static var msInitialized:boolean = false;
	private static var msScaleWidth:float;
	private static var msScaleHeight:float;
	public static final var FONT_SIZE:int = 23;
	public static final var WARNING_FONT_SIZE:int = 30;
	public static final var YOU_LOST_FONT_SIZE:int = 60;
	public static final var TOP_ELEMENTS_FONT_SIZE:int = 28;
	public static final var BUTTON_FONT_SIZE:int = 54;
	public static final var BUY_BTN_FONT:int = 40;
	public static final var ACTIVATION_EPISODE_BTN_FONT:int = 38;
	public static final var BANK_LABEL_FONT:int = 30;
	public static final var PUZZLE_FINISH_WINDOW_FONT:int = 60;
	
	private static function initialize()
	{
		msInitialized = true;
		msScaleWidth = (Screen.width * 1.0f) / DEFAULT_WIDTH;
		msScaleHeight = (Screen.height * 1.0f) / DEFAULT_HEIGHT;
		msScale = Mathf.Min(msScaleWidth, msScaleHeight);
		msScaleMax = Mathf.Max(msScaleWidth, msScaleHeight);
	}	
	
	/**
	 * Retrieve scale factor
	 */
	public static function getScaleFactor():float
	{
		return msScale;
	}
	
	/**
	 * Converting UI size
	 */
	public static function convertRectToMax(rect:Rect):Rect
	{
#if UNITY_EDITOR
		initialize();
#else
		if(!msInitialized)
		{
			initialize();
		}
#endif
	    rect.x *= msScaleMax;
	    rect.y *= msScaleMax;
	    
	    rect.height *= msScaleMax;
	    rect.width *= msScaleMax;
	    return rect;
	}
	
	/**
	 * Converting UI size
	 */
	public static function convertRect(rect:Rect):Rect
	{
#if UNITY_EDITOR
		initialize();
#else
		if(!msInitialized)
		{
			initialize();
		}
#endif
	    rect.x *= msScale;
	    rect.y *= msScale;
	    
	    rect.height *= msScale;
	    rect.width *= msScale;
	    return rect;
	}
	
	/**
	 * Converting Vector2
	 */
	public static function convertVector(vector: Vector2):Vector2
	{
#if UNITY_EDITOR
		initialize();
#else
		if(!msInitialized)
		{
			initialize();
		}
#endif
	    vector.x *= msScale;
	    vector.y *= msScale;
	    return vector;
	}
	
	/**
	 * Converting font size
	 */
	public static function convertFontSize(fontSize:int):int
	{
#if UNITY_EDITOR
		initialize();
#else
		if(!msInitialized)
		{
			initialize();
		}
#endif 
	    fontSize *= msScale;
	    return fontSize;
	}
	
	/**
	 * Convert width
	 */
	 public static function convertWidth(size : float) : float
	 {
#if UNITY_EDITOR
		initialize();
#else
		if(!msInitialized)
		{
			initialize();
		}
#endif 
		return (size*msScaleWidth);
	 }
	 
	 /**
	  * Convert height
	  */
	 public static function convertHeight(size : float) : float
	 {
#if UNITY_EDITOR
		initialize();
#else
		if(!msInitialized)
		{
			initialize();
		}
#endif 
		return (size*msScaleHeight);
	 }
	 
	 /**
	  * Get GUIStyle for different devices
	  */
	 public static function getGUIStyle(retinaStyle:GUIStyle, notRetina:GUIStyle):GUIStyle
	 {	 	
	 	var style:GUIStyle = notRetina;
	 	#if UNITY_IPHONE
		 	//Retina
		 	if(Screen.dpi == 326)
		 	{
		 		style = retinaStyle;
		 	}
		 #else
		 	//TODO: check Android dpi for hdpi (~240dpi) and xhdpi (~320dpi).
		 	if(Screen.dpi >= 320)
		 	{
		 		style = retinaStyle;
		 	}
	 	#endif
	 	return style;
	 }
	 
	 /**
	  * Validate device for support retina images
	  */
	 public static function isRetina()
	 {
	 	var result : boolean = false;
 		#if UNITY_IPHONE
		 	//Retina
		 	if(Screen.dpi == 326)
		 	{
		 		result = true;
		 	}
		#else
		 	//TODO: check Android dpi for hdpi (~240dpi) and xhdpi (~320dpi).
		 	if(Screen.dpi >= 320)
		 	{
		 		result = true;
		 	}
	 	#endif
	 	return result;
	 }
}