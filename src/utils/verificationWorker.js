import reciepts from "../../lib/data/reciepts.json";

class VerificationWorker {
  async verifyReservation(reservation) {
    try {
      const simulateApiRequest = () => {
        return new Promise((resolve) => {
          const fetchingTimeOut = setTimeout(() => {
            resolve(reservation);
            clearTimeout(fetchingTimeOut);
          }, 1000);
        });
      };
      const data = await simulateApiRequest();
      return data;
    } catch (error) {
      return {};
    }
  }

  async verifyRecieptId(recieptId) {
    try {
      const simulateApiRequest = () => {
        return new Promise((resolve) => {
          const fetchingTimeOut = setTimeout(() => {
            resolve(reciepts[recieptId]);
            clearTimeout(fetchingTimeOut);
          }, 1000);
        });
      };
      const data = await simulateApiRequest();
      return data;
    } catch (error) {
      return {};
    }
  }
}

export default VerificationWorker;
