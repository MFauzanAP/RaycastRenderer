//	Declare math utilities class
class MathUtils {

	//	Clamp a value to a specified range
	static clamp (value, min = -Infinity, max = Infinity) {

		//	Return value clamped to the given range
		return Math.min(max, Math.max(min, value));

	}

}
