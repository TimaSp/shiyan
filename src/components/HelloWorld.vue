<template>
    <Row class="loginBlock">
      <Col span="24" class="loginCol">
      <div class="auth">
        <Tabs value="name1">
        <TabPane label="Sign in" name="name1">
          <div class="login">
            <Form ref="formInline">
              <FormItem prop="user">
                  <Input type="text" v-model="login.email" placeholder="Email">
                      <Icon type="ios-email" slot="prepend"></Icon>
                  </Input>
              </FormItem>
              <FormItem prop="password">
                  <Input type="password" v-model="login.password" placeholder="Password">
                      <Icon type="ios-locked-outline" slot="prepend"></Icon>
                  </Input>
              </FormItem>
              <FormItem>
                  <Button type="warning" @click="SingIn(login.email, login.password)">Sign in</Button>
              </FormItem>
            </Form>
          </div>
        </TabPane>
        <TabPane label="Sign up" name="name2">
          <div class="login">
            <Form ref="formInline">
              <FormItem prop="user">
                  <Input type="text" v-model="registrate.email" placeholder="Email">
                      <Icon type="ios-email" slot="prepend"></Icon>
                  </Input>
              </FormItem>
              <FormItem prop="user">
                  <Input type="text" v-model="registrate.displayName" placeholder="Name">
                      <Icon type="ios-person-outline" slot="prepend"></Icon>
                  </Input>
              </FormItem>
              <FormItem prop="password">
                  <Input type="password" v-model="registrate.password" placeholder="Password">
                      <Icon type="ios-locked-outline" slot="prepend"></Icon>
                  </Input>
              </FormItem>
              <FormItem>
                  <Button type="warning" @click="SignUp(registrate.email, registrate.password)">Sign up</Button>                
              </FormItem>
            </Form>
          </div>
        </TabPane>
      </Tabs>
      </div> 
      </Col>
    </Row>
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
        displayName: '',
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
          localStorage.userUid = res.uid
          this.$router.push({ path: '/wallet'})
      }).catch((error) => {
          console.log(error)
          console.log('Owibka')
      });
    },
    SignUp(email, password) {
      wilddog.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
        const ref = wilddog.sync().ref('users').child(user.uid)
        .set({
          email: email,
          displayName: this.registrate.displayName,
          uid: user.uid
        })
        .then(() => {
          console.log('User updated')
          this.$router.push({ path: '/wallet'})
        })
        .catch((error) => {
          console.warn('User not in database')
          this.submitting = false
        })
        console.log(user);
      }).catch((error) => {
          console.log(error)
          console.log("Registration failed");
      });
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.auth {
  background:#f1f1f1;
  border-radius: 10px;
  -webkit-box-shadow: 0px 8px 24px 4px rgba(255,173,40,1);
  box-shadow: 0px 8px 24px 4px rgba(255,173,40,1);
}
.loginCol {
  display: flex;
  justify-content: center;
}
.loginBlock {
  height: 100%;
  display: flex;
  align-items: center;
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
.ivu-tabs-ink-bar {
    background-color: #ffcc65;
}
</style>
