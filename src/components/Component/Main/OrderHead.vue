<template>
    <div>
          <b-navbar variant="faded" type="light">
            <b-navbar-brand href="#" class="cfont">
                    <b-nav-item-dropdown text="&#9776;" no-caret class="d-inline-block">
                        <b-dropdown-item href="#">음성주문</b-dropdown-item>
                        <b-dropdown-item href="" to="order">주문</b-dropdown-item>
                        <b-dropdown-item href="#" to="favorite">즐겨찾기</b-dropdown-item>
                        <b-dropdown-item href="#">홍보페이지</b-dropdown-item>
                        <b-dropdown-item href="#" to="orderHistory">주문내역</b-dropdown-item>
                        <b-dropdown-item href="#" to="refundHistory">반품내역</b-dropdown-item>
                        <b-dropdown-item href="#" to="statistics">통계</b-dropdown-item>
                        <b-dropdown-item href="#" to="setting">설정</b-dropdown-item>
                    </b-nav-item-dropdown>
                {{this.store.state.customer.deliverer_bname}}
                <img src="@/assets/Under_Color.png" class="d-inline-block align-center ml-3" alt="BV" width="35px">
            </b-navbar-brand>
            </b-navbar>
    </div>
</template>

<script>
    export default {
        name: 'Head'
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