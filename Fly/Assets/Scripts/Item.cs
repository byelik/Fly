using UnityEngine;
using System.Collections;

/// <summary>
/// Item.
/// </summary>
public class Item : MonoBehaviour
{
	[SerializeField]
	private string itemName;
	/// <summary>
	/// Selects the item.
	/// </summary>
	public void selectItem()
	{
		//DO SOMETHING...
		PlayerPrefs.SetString("ItemName", itemName);
	}
}
