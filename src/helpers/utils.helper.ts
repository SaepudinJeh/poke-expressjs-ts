export class UtilHelper {
  static generateRangeNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static checkIsPrime(number: number) {
    if (number <= 1) {
      return false;
    }

    for (let i = 2; i <= Math.sqrt(number); i++) {
      // Jika bilangan dapat dibagi habis oleh suatu bilangan selain 1 dan dirinya sendiri, bukan bilangan prima
      if (number % i === 0) {
        return false;
      }
    }

    return true;
  }
}
