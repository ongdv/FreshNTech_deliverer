<template>
    <div>
        <div>
            <div class="w-100 bg-light" style="margin-top:10px;">
                <b-list-group class="border-0">
                    <b-list-group-item class="border-0 bg-light">
                        <span>
                            <span style="font-size: 1.1em;font-weight:bold;">
                                배송지
                            </span>
                            <br>
                            <span style="font-size: 0.75em;color:gray;">
                                {{this.store.state.userAddress}}
                            </span>
                        </span>
                        <div style="position:absolute;right:1%;top:15%;">
                            <img src="@/assets/Next.png" alt="1" width="35px;">
                        </div>
                    </b-list-group-item>
                </b-list-group>    
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'OrderAddress'
    }
</script>

<style scoped>

</style>