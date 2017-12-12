<template>
  <div class="hello">
    <Row>
      <Col span="24">
      <Tabs value="name1">
        <TabPane label="Sign in" name="name1">
          <div class="login">
            <Form ref="formInline">
              <FormItem prop="user">
                  <Input type="text" v-model="login.email" placeholder="Username">
                      <Icon type="ios-person-outline" slot="prepend"></Icon>
                  </Input>
              </FormItem>
              <FormItem prop="password">
                  <Input type="password" v-model="login.password" placeholder="Password">
                      <Icon type="ios-locked-outline" slot="prepend"></Icon>
                  </Input>
              </FormItem>
              <FormItem>
                  <Button type="primary" @click="SingIn(login.email, login.password)">Sign in</Button>
              </FormItem>
            </Form>
          </div>
        </TabPane>
        <TabPane label="Sign up" name="name2">
          <div class="login">
            <Form ref="formInline">
              <FormItem prop="user">
                  <Input type="text" v-model="registrate.email" placeholder="Username">
                      <Icon type="ios-person-outline" slot="prepend"></Icon>
                  </Input>
              </FormItem>
              <FormItem prop="user">
                  <Input type="text" v-model="registrate.login" placeholder="login">
                      <Icon type="ios-person-outline" slot="prepend"></Icon>
                  </Input>
              </FormItem>
              <FormItem prop="password">
                  <Input type="password" v-model="registrate.password" placeholder="Password">
                      <Icon type="ios-locked-outline" slot="prepend"></Icon>
                  </Input>
              </FormItem>
              <FormItem>
                  <Button type="primary" @click="SignUp(registrate.email, registrate.password)">Sign up</Button>                
              </FormItem>
            </Form>
          </div>
        </TabPane>
      </Tabs>
        
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      login: {
        email: '',
        password: ''
      },
      registrate: {
        login: '',
        email: '',
        password: ''
      }
    }
  },
  mounted() {

  },
  methods: {
    SingIn(email, password) {
      wilddog.auth().signInWithEmailAndPassword(email, password)
      .then((res) => {
          console.log(res);
          console.log('ZAWEL')
          this.$router.push({ path: '/todo'})
      }).catch((error) => {
          // 错误处理
          console.log(error)
          console.log('Owibka')
      });
    },
    SignUp(email, password) {
      wilddog.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
        const ref = wilddog.sync().ref('users').child(user.uid)
        .set({
          ...user
        })
        .then(() => {
          console.log('User updated')
        })
        .catch((error) => {
          console.warn('User not in database')
          this.submitting = false
        })
        console.log(user);
      }).catch((error) => {
          console.log("Registration failed");
      });
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
html {
  height: 100%;
}
h1, h2 {
  font-weight: normal;
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
.login {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
