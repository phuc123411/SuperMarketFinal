import * as CryptoJS from 'crypto-js';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VNPayService {
  private vnpayApiUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';

  constructor(private http: HttpClient) {}

  sendPaymentRequest(formData: any) {
    const expireDate = new Date();
    expireDate.setMinutes(expireDate.getMinutes() + 15);
    let params = new HttpParams()
      .set('vnp_Version', '2.1.0')
      .set('vnp_Command', 'pay')
      .set('vnp_TmnCode', '96PV39NC')
      .set('vnp_Amount', formData.totalPrice)
      .set('vnp_BankCode', 'BIDV')
      .set('vnp_CreateDate', new Date().toISOString())
      .set('vnp_CurrCode', 'VND')
      .set('vnp_IpAddr', '127.0.0.1')
      .set('vnp_Locale', 'vn')
      .set('vnp_OrderInfo', formData.description)
      .set('vnp_OrderType', 'billpayment')
      .set('vnp_ReturnUrl', 'http://localhost:4200/payment/result')
      .set('vnp_ExpireDate', expireDate.toISOString().slice(0, 14).replace(/[-:]/g, ''))
      .set('vnp_TxnRef', 'ORD1234567890');

    // Tạo mã hash bảo mật
    params = params.append('vnp_SecureHash', this.generateSecureHash(formData));

    // Không cần nhận phản hồi từ VNPay, chỉ gửi yêu cầu đến VNPay và chuyển hướng trang
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const paymentRequest = this.http.post(this.vnpayApiUrl, params.toString(), { headers });

    // Chuyển hướng trang sau khi gửi yêu cầu
    paymentRequest.subscribe(
      () => {
        console.log('Payment request sent successfully.');
        this.redirectToVNPay();
      },
      error => {
        console.error('Error sending VNPay payment request:', error);
        // Xử lý lỗi nếu cần
      }
    );
  }

  private generateSecureHash(formData: any): string {
    // Tạo chuỗi dữ liệu cần hash từ formData
    let hashData = `vnp_Amount=${formData.totalPrice}&vnp_Command=pay&vnp_CreateDate=${new Date().toISOString()}&vnp_CurrCode=VND&vnp_IpAddr=127.0.0.1&vnp_Locale=vn&vnp_OrderInfo=${formData.description}&vnp_OrderType=billpayment&vnp_ReturnUrl=http://localhost:4200/payment/result&vnp_TmnCode=96PV39NC&vnp_TxnRef=ORD1234567890`;

    // Hash chuỗi dữ liệu với secret key
    const secretKey = 'ZYCTQITJBJSIYKRGUROFFNJHNQGCRSPZ'; // Thay bằng secret key thực tế của bạn
    const secureHash = CryptoJS.SHA512(secretKey + hashData).toString(CryptoJS.enc.Hex);

    return secureHash.toUpperCase(); // Trả về hash dưới dạng chữ in hoa
  }

  private redirectToVNPay() {
    window.location.href = this.vnpayApiUrl;
  }
}
