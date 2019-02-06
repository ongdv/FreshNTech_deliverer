<template>
    <div>
          <b-navbar variant="faded" type="light">
            <b-navbar-brand href="#" class="cfont">
                    <b-nav-item-dropdown text="&#9776;" no-caret class="d-inline-block">
                        <b-dropdown-item href="#" to="todayDelivery">당일배송</b-dropdown-item>
                        <b-dropdown-item href="" to="totalHistory">전체내역</b-dropdown-item>
                        <b-dropdown-item href="#" to="orderHistory">배송내역</b-dropdown-item>
                        <b-dropdown-item href="#">지도보기/배송경로</b-dropdown-item>
                        <b-dropdown-item href="#" to="refund">반품요청</b-dropdown-item>
                        <b-dropdown-item href="#" to="refundHistory">취소/반품</b-dropdown-item>
                        <b-dropdown-item href="#" to="#">통계</b-dropdown-item>
                        <b-dropdown-item href="#" to="#">설정</b-dropdown-item>
                    </b-nav-item-dropdown>
                {{this.store.state.customer.bname}}
                <img src="@/assets/Under_Color.png" class="d-inline-block align-center ml-3" alt="BV" width="35px">
            </b-navbar-brand>
            </b-navbar>
    </div>
</template>

<script>
    export default {
        name: 'MainHead'
    }
</script>

<style scoped>
    @font-face {
        font-family: "BMHANNA";
        src: url('/fonts/BMHANNA.ttf');
        font-weight: normal;
        font-style: normal;
    }
    .cfont{
        font: "BMHANNA";
        font-weight: bold;
    }
</style>