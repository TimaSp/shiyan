<template>
  <Row>
    <div class="productTable">
      <Row class-name="tableHeader">
        <Col span="24">
          <h1>Hello {{getUserInfo.displayName}}, ADD YOUR SUBJECT</h1>                 
        </Col>
        <Col span="6">
            <input 
              v-model="subject"            
              name="Subject" 
              type="text" 
              class="input-nn"
              placeholder="Subject"
            />
        </Col>
        <Col span="6">
            <input 
              name="credits" 
              type="text" 
              class="input-nn"
              placeholder="credits"
              v-model="credit"
            />
        </Col>
        <Col span="6">
            <input
              name="result" 
              type="text" 
              class="input-nn"
              placeholder="result"
              v-model="result"
            />             
        </Col>
        <Col span="6" class="submitBtn">
            <Button 
              type="warning"
              v-if="save" 
              @click="saveChanges()"
              style="height:32px;"
            >SAVE
            </Button>
            <Button type="warning" @click="addProduct()">ADD</Button>
        </Col>
      </Row>
      <Row>
        <Col span="8" v-for="(index, key) in getSubjects" :key="key">
          <div class="subjectCard">
            <Card style="width:250px;margin: 20px;">
              <div class="cardHeader" style="text-align:center">
                <h2>{{index.name}}</h2>
                <h3>credits: {{index.credit}}</h3>
                <h3>exam result: {{index.result}}</h3>
              </div>
                <Button class="toBtn" type="warning" @click="editProduct(key)">
                  <i class="fa fa-pencil"></i>
                </Button>
                <Button class="toBtn" type="error" @click="removeProduct(key)">
                  <i class="fa fa-trash"></i>
                </Button>
            </Card>
          </div>   
        </Col>
      </Row>
    </div>
  </Row>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      daysOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      userInfo: {},
      subject: '',
      credit: '',
      result: '',
      products: [],
      save: false,
      count: 0,
      subjectID:'',
    }
  },
  computed: {
    getUserInfo() {
			if (!localStorage.userUid) this.$router.push({ path: '/'})
			else {
				const uid = localStorage.userUid
				const userRef = wilddog.sync().ref().child('users').child(uid)
				userRef.once('value').then(response => {
					let data = response.val()
					this.userInfo = data
				})
			}
      return this.userInfo
		},
    getSubjects() {
      const subjectsRef = wilddog.sync().ref().child('users').child(this.getUserInfo.uid).child('subjects')
      subjectsRef.once('value').then(response => {
        let data = response.val()
        this.products = data
      })
      return this.products
    } 
  },
  methods:  {
    gg(e) {
      console.log(e)
      this.startingTime = e
    },
    addProduct() {
      const parentRef = wilddog.sync().ref().child('users').child(this.getUserInfo.uid).child('subjects')
      let product = {
          name: this.subject,
          credit: this.credit,
          result: this.result,
        }
        parentRef.push({
          ...product
        })
      this.cleanForms()
    },
    editProduct(id) {
      console.log()
      this.subjectID = id
      this.subject = this.products[id].name
      this.credit = this.products[id].credit
      this.result = this.products[id].result
      this.save = true
    },
    saveChanges() {
      const parentRef = wilddog.sync().ref().child('users').child(this.getUserInfo.uid).child('subjects').child(this.subjectID)
      parentRef.update({
        name: this.subject,
        credit: this.credit,
        result: this.result 
      })
      this.cleanForms()
      this.save = false      
    },
    removeProduct(key)  {
      console.log(key)
      const parentRef = wilddog.sync().ref().child('users').child(this.getUserInfo.uid).child('subjects').child(key).remove()
    },
    cleanForms() {
        this.subject = ''
        this.credit = ''
        this.result = ''
    }
  }
}
</script>

<style>
  .subjectCard {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .cardHeader h2 {
    padding: 18px 0px;
  }
  .tableHeader h1 {
    padding: 10px;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  .productTable {
    border: 1px solid #e4e3e3;
    background: #fff;
    border-radius: 2px;
    margin: 70px;
    overflow: hidden;
    -webkit-box-shadow: 0px 8px 24px 4px rgba(255,173,40,1);
    box-shadow: 0px 8px 24px 4px rgba(255,173,40,1);    
  }
  .tableHeader {
    background-color: #f2f2f2;    
    padding: 40px;
  }
  button:hover {
    background-color: #757575;
    color: white;
  }
  button:hover i{
    color: white;
  }
  button {
    background: 0 0;
    border: none;
    border-radius: 2px;
    color: #757575;
    position: relative;
    height: 36px;
    margin: 0;
    min-width: 64px;
    padding: 0 16px;
    display: inline-block;
    font-size: 14px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0;
    overflow: hidden;
    will-change: box-shadow;
    transition: box-shadow .2s cubic-bezier(.4,0,1,1),background-color .2s cubic-bezier(.4,0,.2,1),color .2s cubic-bezier(.4,0,.2,1);
    outline: none;
    cursor: pointer;
    text-decoration: none;
    text-align: center;
    line-height: 36px;
    vertical-align: middle;
    border: 1px solid #757575;
}
    h1, h2 {
      font-weight: 900;
      font-size: 30px;
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
    .content {
      background: #e4e3e3;
    }
    .input-nn {
      height: 28px;
      line-height: 28px;
      width: 80%;
      border: 1px solid #eee;
      border-radius: 4px;
      margin-bottom: 15px;
      color: #818181; 
      padding-left: 5px;
      transition: all ease-in-out .2s;
      display: inline-block;
    }
    .input-nn:focus {
      cursor: pointer;
      transition: all ease-in-out .2s;
      border: 1px solid rgba(255,173,40,1)!important;
      outline: 0;
    }
    .input-nn:hover {
      cursor: pointer;
      transition: all ease-in-out .2s;
      border: 1px solid rgba(255,173,40,0.6);
      outline: 0;
    }
</style>
