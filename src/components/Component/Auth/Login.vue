<template>
  <div class="bg-white">
    <b-form @submit="onSubmit" align="center">
        <b-form-input id="userid"
                      type="text"
                      v-model="form.userid"
                      class="w-80 mx-auto"
                      required
                      placeholder="사번">
        </b-form-input>
        <b-form-input id="userpw"
                      type="password"
                      v-model="form.userpw"
                      class="w-80 mx-auto mt-2"
                      required
                      placeholder="비밀번호">
        </b-form-input>
        
        <b-button type="submit" size="lg"
          style="background: #00b09b; background: linear-gradient(to left, #96c93d, #00b09b); boder:none;"
          class="w-100 mt-2 border-white" >
        로그인</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
    name: 'Login',
    data () {
        return {
            form: {
                userid: '',
                userpw: ''
            },
        }
    },
    methods: {
        onSubmit (evt) {
            evt.preventDefault();
            this.$emit('login', this.form);
        }
    }
}
</script>

<style scoped>
    .w-80{
        border: none;
        border-bottom: 0.5px solid darkgray;
        
    }
</style>
