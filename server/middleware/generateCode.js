export async function generateRandomCode() {
  var min = 100000; 
  var max = 999999; 
  var code = Math.floor(Math.random() * (max - min + 1)) + min;
  return code;
}
