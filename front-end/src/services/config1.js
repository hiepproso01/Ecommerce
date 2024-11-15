
export default  {
    accessKey: 'F8BBA842ECF85',
    secretKey: 'K951B6PE1waDMi640xX08PD3vg6EkVlz',
    orderInfo: 'pay with MoMo',
    partnerCode: 'MOMO',
    redirectUrl: 'https://www.youtube.com/watch?v=T0mft38MLjI', //Sau khi thanh toán thành công sẽ qua trang này
    ipnUrl: 'https://0778-14-178-58-205.ngrok-free.app/callback', //chú ý: cần dùng ngrok thì momo mới post đến url này được
    requestType: 'payWithMethod',
    extraData: '',
    orderGroupId: '',
    autoCapture: true,
    lang: 'vi',
  };
