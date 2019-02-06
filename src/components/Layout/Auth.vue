<template>
    <div class="h-100 bg-dark container">
        <b-card class="border-dark bg-dark">
            <img src="@/assets/logo.png" class="w-100" alt="logo">
        </b-card>
        <b-card-group deck class="w-80 bg-dark login">
            <b-card >
                <p class="card-text">
                    <login v-on:login="login"/>
                </p>
            </b-card>
            <LoginOption />
        </b-card-group>
    </div>
</template>

<script>
    import {Login, LoginOption} from '../Component/';
    var baseurl = 'http://freshntech.cafe24.com';
    export default {
        name: 'Auth',
        components: {
            Login: Login,
            LoginOption: LoginOption
        },
        methods : {
            login (data) {
                console.log(data);
                this.$http.post(baseurl + '/deliverer/login', data)
                .then((res) => {
                    console.log(res);
                    if(res.data.customer.isAuth){
                        this.store.state.customer = res.data.customer;
                        this.store.state.delivererNotice = res.data.delivererNotice;
                        // this.store.state.customer = this.customer(res.data.customer);
                        // this.store.state.delivererNotice = this.delivererNotice(res.data.delivererNotice);
                    }else{
                        console.log('X');
                        return;
                    }
                })
                .then(() => {
                    this.$router.push('/');
                })
                .catch((err) => {
                    console.log(err);
                })
            }
            // ,
            // b64DecodeUnicode(str) {
            //     return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
            //         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
            //     }).join(''))
            // },
            // delivererNotice (str) {
            //     for(var i =0; i < str.length; i++){
            //             str[i].id = this.b64DecodeUnicode(str[i].id);
            //             str[i].title = this.b64DecodeUnicode(str[i].title);
            //             str[i].regDate = this.b64DecodeUnicode(str[i].regDate);
            //         }
            //     return str;
            // },
            // customer (str) {
            //     str.bname = this.b64DecodeUnicode(str.bname);
            //     str.id = this.b64DecodeUnicode(str.id);
            //     str.userid = this.b64DecodeUnicode(str.userid);
            //     return str;
            // },
        }
    }
</script>

<style scoped>
    w-80{
        width:80%;
    }
</style>