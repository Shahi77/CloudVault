class ApiResponse {
  constructor(data, message = "Success") {
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}
export default ApiResponse;
