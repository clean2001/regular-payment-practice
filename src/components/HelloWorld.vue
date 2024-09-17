<template>
  <div class="hello">
    <h1>이거 누르면 결제 정보 등록되는거다</h1>
    <button @click="this.addPaymentMethod">결제 정보 등록하기</button>

    <h1>이거 누르면 결제되는거다</h1>
    <button @click="this.pay">10원 결제하기</button>
  </div>
</template>

<script>
import * as PortOne from "@portone/browser-sdk/v2";
import axios from 'axios';

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      billingKey: "",
    }
  },
  methods: {
    async addPaymentMethod() {
      try {
        const res = await PortOne.requestIssueBillingKey({
          storeId: `${process.env.PORTONE_STORE_ID}`, // 고객사 storeId로 변경해주세요.
          channelKey: `${process.env.PORTONE_CHANNEL_KEY}`, // 콘솔 결제 연동 화면에서 채널 연동 시 생성된 채널 키를 입력해주세요.
          billingKeyMethod: "EASY_PAY",
          issueId: "test-issueId",
          issueName: "동상이농 카드 등록",
          orderName: "테스트오더",
          paymentId: "test_payment_001",
          totalAmount: 0,
          curreny: "KRW",
          paymentMethod: "EASY_PAY",
          redirectUrl: `${process.env.VUE_APP_API_BASE_URL}/payment-done`,
          offerPeriod: {
            interval: "1m"
          },
          customer: {
            fullName: "김세정",
            phoneNumber: "010-3104-4841",
            email: "clearrworld@gmail.com",
          },
        });

      
        this.billingKey = res.billingKey;
        console.log(res);
        console.log("빌링키 발급 성공!!!!!!!!!!!!!!!!!!!!");
        console.log(this.billingKey);
        // location.href = "http://localhost:8082/payment-done";
      } catch(e) {
        console.log("line 84 실패~~~~~~~~~~~~~~~~");
        console.log(e);
      }

    },
    async pay() {
      const billingKey = this.billingKey;
      
      console.log("line 102 billingKey: " + billingKey);
      let paymentResponse = "";
      try {
        // 결제 요청
        // 포트원 빌링키 결제 API 호출
        const paymentResponse = await axios.post(`${process.env.SERVER_BASE_URL}/kakaopay`, {
          billingKey: billingKey,
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        // 응답 처리
        console.log(paymentResponse.data);
        console.log("line 120:");
        console.log(paymentResponse);
        // if (!paymentResponse.ok)
        //   throw new Error(`paymentResponse: ${await paymentResponse.json()}`);

      } catch(e) {
        console.log(paymentResponse);
        console.log("line 106 실패!!!");
        console.log(e);
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
