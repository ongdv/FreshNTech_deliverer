<template>
    <div>
        <b-navbar variant="faded" type="light" style="background: #00b09b; background: linear-gradient(to left, #00b09b, #96c93d); boder:none;">
            <div class="text-center w-100 text-white font-weight-bold">
                {{headname}}
            </div>
            <router-link class="position-absolute text-center" style="width:10%;height:100%;left:0" to="/favorite">
                <img src="@/assets/Prev.png" alt="Prev" width="25">
            </router-link>
        </b-navbar>
    </div>
</template>

<script>
    export default {
        name: 'FavoriteHead',
        props: ['headname']
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