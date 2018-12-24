<template>
    <div>
        <b-carousel id="carousel1"
                    style="text-shadow: 1px 1px 2px #333;"
                    
                    background="#ababab"
                    :interval="4000"
                    :img-width="getwidth"
                    img-height="480"
                    v-model="slide"
                    @sliding-start="onSlideStart"
                    @sliding-end="onSlideEnd"
        >
                    <!-- Slides with image only -->
        <b-carousel-slide>
            <img slot="img" class="d-block img-fluid " width="1024" height="480" src="@/assets/mainBanner.png" alt="image slot">
        </b-carousel-slide>

<!-- <b-carousel-slide v-for="(item, index) in this.store.state.adBoard" v-bind:key="index">
            <img slot="img" class="d-block img-fluid w-100" width="1024" height="480"
                :src="item.imgurl" alt="image slot">
            </b-carousel-slide> -->

        

        </b-carousel>
        <!-- <p class="mt-4">
        Slide #: {{ slide }}<br>
        Sliding: {{ sliding }}
        </p> -->

    </div>
</template>

<script>
export default {

    data () {
        return {
            slide: 0,
            sliding: null,
            getwidth:window.innerWidth
        }
    },
    methods: {
        onSlideStart (slide) {
            this.sliding = true
        },
        onSlideEnd (slide) {
            this.sliding = false
        }
    }
}
</script>
<!-- carousel-1.vue -->