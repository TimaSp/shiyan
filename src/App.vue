<template>
  <div id="app">
    <Row v-if="routerSh" style="margin-top: 20px;">
      <Col>
      <router-link :to="'/todo'" class="rBtn" type="">
        Subjects
      </router-link>
      <router-link :to="'/wallet'" class="rBtn">
        Wallet
      </router-link>
      <Button class="rBtn" @click="logOut">LOG OUT</Button>
      </Col>
    </Row>
    
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      showRouter: false
    }
  },
  computed: {
    routerSh() {
      if (this.$route.path === '/') this.showRouter = false
      else this.showRouter = true
      return this.showRouter
    }  
  },
  methods: {
    logOut() {
			wilddog.auth().signOut(() => {
				localStorage.removeItem('userUid')
				this.$router.push({ path: '/'})
			})
		}
  }
}
</script>

<style>
.ivu-tabs-nav .ivu-tabs-tab:hover {
    color: #facc65;
}
.ivu-tabs-nav .ivu-tabs-tab-active {
  color: #facc65;
}
.ivu-tabs-ink-bar {
  background-color: #facc65;
}
.rBtn {
  margin: 10px;
  padding: 10px;
  background: white;
  color: black;
  border-radius: 5px;
}
.rBtn:hover {
  margin: 10px;
  padding: 10px;
  background: #c2c2c2;
  color: white;
  border-radius: 5px;
}

#app {
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

* {
	box-sizing: border-box;
}
html {
  height: 100%;
}
body {
  height: 100%;  
	margin: 0;
	-webkit-font-smoothing:antialiased;
	-moz-osx-font-smoothing:grayscale;
	background-color: #ffcc66;
  overflow-x: hidden;
}
</style>
