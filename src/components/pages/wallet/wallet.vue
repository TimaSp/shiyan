<template>
<div>
	<button @click="logOut">LOG OUT</button>
<div class="wrapper">
    <div class="app-wrapper">
      <aside class="wallet">
        <h2>My Wallets</h2>
        <div class="modal-control" @click="showModal = true">+</div>
        <div class="cards">
          <div class="credit-card" @click="selectAccount(account)" v-for="(account, key) in accounts" :key="key">
            <div class="credit-card__name">
							{{account.accName}}
						</div>
            <div v-if="account.currency === 'USD'" class='credit-card__usd'>
              {{account.accBalance}}
            </div>
						<div v-if="account.currency === 'CNY'" class='credit-card__cny'>
              {{account.accBalance}}
            </div>
						<div class="credit-card__number" v-if="account.cardNumber">
							{{account.cardNumber}}
						</div>
          </div>
        </div>
      </aside>

      <div class="transactions-wrapper">
        <div class="transactions">
					<h2 class="active-header">
						{{ activeAccount.accName }}
						<span class="total-balance">
							{{ activeAccount.accBalance }}
						</span>
						<span class="add-transaction" @click="addTransaction(activeAccount)">+</span>
					</h2>
            <div
              class="transaction-item"
              v-for="(transaction, key) in activeAccount.transactions"
              :key="key"
            >
              <div class='transaction-item_details'>
                <h3 class="transaction-name">{{transaction.name}}</h3>
								<p class="description">
									{{transaction.description}}
								</p>
                <span class='details'>{{transaction.date | day}} {{transaction.date | month}}</span>
              </div>
              <div class='transaction-item_amount'>
                <span v-if="transaction.currency === 'USD'">
									$
								</span>
								<span v-if="transaction.currency === 'CNY'">
									元
								</span>
                <p class='amount'>
                  {{transaction.amount}}</p>
              </div>
              </div>
          </div>
        </div>
      </div>

    </div>

  <modal v-if="showModal" :toggleModal="toggleModal" :user="userInfo"/>
  <modal-transaction v-if="showModalTransaction" :toggleModal="toggleModal2" :account="activeAccount"/>
  </div>
</template>

<script>
import moment from 'moment'
import Modal from '../../shared/Modal/Modal.vue'
import ModalTransaction from '../../shared/ModalTransaction/ModalTransaction.vue'

export default {
  data() {
    return {
			msg: false,
			showModal: false,
			showModalTransaction: false,
			userInfo: {
				name: "RT"
			},
			accounts: [],
			activeAccount: {},
			cards: [
				{
					type: "visa",
					number: "**** **** **** 2562",
					expiration: "12/17",
					transactions: [
						{
							name: "Apple iPhone 6, 6g GB",
							type: "debit",
							category: "Electronics",
							ID: "#343223",
							date: "12 July, 2016",
							amount: "+650.00"
						},
						{
							name: "Funds Added",
							type: "credit",
							category: "Payment",
							ID: "#343212",
							date: "11 July, 2016",
							amount: "-900.00"
						},
						{
							name: "Energy Bill",
							type: "debit",
							category: "",
							ID: "#343566",
							date: "11 July, 2016",
							amount: "+84.96"
						},
						{
							name: "Mega Image SRL",
							type: "debit",
							category: "Food&Health",
							ID: "#343565",
							date: "11 July, 2016",
							amount: "+112.75"
						},
							{
							name: "ATM DV24",
							type: "debit",
							category: "",
							ID: "#343253",
							date: "09 July, 2016",
							amount: "+200.00"
						},
						{
							name: "Lukoil Station",
							type: "debit",
							category: "Gas",
							ID: "#343279",
							date: "09 July, 2016",
							amount: "+190.48"
						},
						{
							name: "Funds Added",
							type: "credit",
							category: "Payment",
							ID: "#343212",
							date: "11 July, 2016",
							amount: "+390.81"
						}
					]
				}
			]
    }
	},
	components: {
		Modal,
		ModalTransaction
	},
	filters: {
		month(date) {
			return moment(date).format('MMM');
		},
		day(date) {
			return moment(date).format('D');
		}
	},
	watch: {
		accounts() {
			console.log('!')
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
		},
		getAccounts() {
			const uid = localStorage.userUid
			const walletRef = wilddog.sync().ref().child('users').child(uid).child('wallets')
			walletRef.once('value').then(response => {
					let data = response.val()
				this.accounts = data
			})
		}
	},
  methods: {
    selectAccount(_acc) {
      console.log(_acc);
      this.activeAccount = _acc
		},
		logOut() {
			wilddog.auth().signOut(() => {
				localStorage.removeItem('userUid')
				this.$router.push({ path: '/'})
			})
		},
		toggleModal() {
			const uid = localStorage.userUid
			const walletRef = wilddog.sync().ref().child('users').child(uid).child('wallets')
			walletRef.once('value').then(response => {
					let data = response.val()
				this.accounts = data
			})
			this.activeAccount = {}
			this.showModal = !this.showModal
			
		},
		toggleModal2() {
			const uid = localStorage.userUid
			const walletRef = wilddog.sync().ref().child('users').child(uid).child('wallets')
			walletRef.once('value').then(response => {
					let data = response.val()
				this.accounts = data
			})
			this.activeAccount = {}
			this.showModalTransaction = !this.showModalTransaction
		},
		addTransaction(_acc) {
			console.log(_acc)
			this.showModalTransaction = true
		}
	},
	mounted() {
		this.getAccounts
	}
}
</script>

<style lang="css">
.active-header {
	border-bottom: 1px solid #e5e5e5;
	height: 50px;
	line-height: 50px;
	position: relative;
	margin-bottom: 20px;
}
.add-transaction {
	display: inline-block;
	position: absolute;
	top: 0;
	left: 0;
	color: #c6cce2;
	font-size: 45px;
	line-height: 22px;
	cursor: pointer;
	-webkit-transition: color .1s;
	transition: color .1s;
}
.description {
	text-align: left;
	color: #818181;
}
.transaction-name {
	text-align: left;
}
h2 {
	margin: 0px;
	font-weight: 400;
	color: #707584;
	font: 24px/24px 'Open Sans', sans-serif;
}

h3 {
	margin: 0px 0px 5px;
	font-weight: 600;
	font-size: 18px;
	line-height: 18px;
}

.wrapper {
	width: 100vw;
	padding: 10px 10px;
}

.app-wrapper {
	background-color: #fff;
	height: 700px;
	max-width: 880px;
	margin: 0 auto;
	border-radius: 8px;
	display: flex;

	-webkit-box-shadow: 0px 8px 24px 4px rgba(255,173,40,1);
	-moz-box-shadow: 0px 8px 24px 4px rgba(255,173,40,1);
	box-shadow: 0px 8px 24px 4px rgba(255,173,40,1);
}

.wallet {
	width: 360px;
	background-color: #f2f2f2;
	height: 100%;
	border-top-left-radius: inherit;
	border-bottom-left-radius: inherit;
	padding: 50px;
}

.wallet h2 {
	display:inline-block;
}

.transactions-wrapper {
	width: 520px;
	padding: 50px 50px 20px 50px;
}

.total-balance {
	display: inline-block;
	float: right;
	font-weight: 600;
	font-size: 32px;
	color: #444750;
}
.total-balance::before {
	content: '$';
}

.transactions {
	height: 100%;
	overflow: scroll;
}

.transactions.show {
	animation: fade-in .3s 1;
}

.transactions::-webkit-scrollbar { 
    display: none; 
}

.transaction-item {
	margin-bottom: 15px;
}

.transaction-item {
	position: relative;
	display: flex;
}

.transaction-item span.details {
	font-size: 14px;
	line-height: 14px;
	color: #999;
	position: absolute;
	top: -5px;
	right: 0;
}

.transaction-item_details {
	width: 70%;
}

.transaction-item_amount {
	width: 30%;
	text-align: right;
}
.transaction-item_amount span {
	font-weight: 600;
	font-size: 18px;
	line-height: 45px;
}

.transaction-item_amount .amount {
	font-weight: 600;
	font-size: 18px;
	line-height: 45px;
	position: relative;
	margin: 0px;
	display: inline-block;
	text-indent: -15px;
}

/* Hide + and - */
.transaction-item_amount .amount::first-letter {
	color: transparent !important;
}

.cards {
	margin-top: 60px;
}

.credit-card {
	  padding: 15px;
		position: relative;
    background-color: #fff;
    margin-bottom: 25px;
		border-radius: 3px;
    border: 2px solid #e1e1e1;
		font-family: 'Roboto', sans-serif;
		cursor: pointer;
		transition: .1s ease-in-out;
}
.credit-card__name {
	color: green;
}
.credit-card__usd {
	font-weight: 600;
	font-size: 12px;
	color: #444750;
	position: absolute;
	top: 0;
	right: 0;
	border: 1px solid #ddd;
	border-right: 0;
	border-top: 0;
	padding: 5px;
}
.credit-card__usd::after {
	content: '$';
	font-size: 10px;
}
.credit-card__cny {
	font-weight: 600;
	font-size: 12px;
	color: #444750;
	position: absolute;
	top: 0;
	right: 0;
	border: 1px solid #ddd;
	border-right: 0;
	border-top: 0;
	padding: 5px;
}
.credit-card__cny::after {
	content: '元';
	font-size: 10px;
}
.credit-card__balance {
	color: purple;
}
.credit-card:hover {
	transform: scale(1.07);
}

.credit-card.active {
	border-color: #8393ca;
	border-width: 3px;
}

.card-image {
	display: inline-block;
	height: 40px;
	width: 58px;
	background-repeat: no-repeat;
	background-size: cover;
	border-radius: 3px;
	margin-bottom: 10px;
}

.credit-card_expiration {
	color: #b3b3b3;
}

.credit-card__number {
	color: #666666;
}

.card-list {
	margin-top: 20px;
}

.card-list .card-image {
	cursor: pointer;
	margin-right: 15px;
	transition: .1s;
}

.card-list .card-image:hover {
	transform: scale(1.1);
}

.modal {
	display: none;
	position: fixed;
	width: 100vw;
	height: 100vh;
	background-color: rgba(0,0,0,0.7);
	z-index: 1;
	top: 0;
	left: 0;
	text-align: center;
	transition: .2s;
}

.modal.open {
	display: block;
}

.modal-body {
	background-color: #fff;
	border-radius: 5px;
	padding: 35px 15px 25px;
	z-index: 2;
	display: inline-block;
	margin-top: 20%;
	width: 100%;
	max-width: 400px;
	position: relative;
}

.modal-body h3 {
	font: 20px/20px 'Open Sans', sans-serif;
	color: #707584;
}

.modal-control, .modal-close {
	display: inline-block;
	float: right;
	color: #c6cce2;
	font-size: 45px;
	line-height: 22px;
	cursor: pointer;
	transition: color .1s;
}

.modal-control:hover, .modal-close:hover {
	color: #8393ca;
}

.modal-close {
	position: absolute;
	top: 10px;
	right: 10px;
	transform: rotate(45deg);
}

/* animations */
@keyframes fade-in {
	0% {
		opacity: 0;
	}
  100% {
    opacity: 1;
  }
}

/* media queries */
@media(max-width:810px) {
	.wrapper {
		border-radius: 8px;
	}    
	.wallet {
		width: 100%;
		border-top-right-radius: inherit;
		padding-bottom: 25px;
	}
	.cards {
		margin-top: 25px;
	}
	.app-wrapper {
		-webkit-flex-direction: column;
    flex-direction: column;
		width: 100%;
		border-top-right-radius: inherit;
		height: initial;
	}
	.credit-card {
		width: calc(50% - 25px);
    max-width: 260px;
    display: inline-block;
    margin-right: 25px;
		margin-bottom: 25px;
    text-align: left;
	}
	.credit-card:nth-of-type(2) {
		margin-right: 0px;
	}
	.transactions {
		height: initial;
	}
	.transactions-wrapper {
		width: 100%;
	}
	.transaction-item_amount {
		width: calc(100% - 270px);
	}
}

@media(max-width:530px) {
	h3 {
		line-height: 24px;
	}
	.cards {
		text-align: center;
	}
	.credit-card {
		width: calc(100% - 25px);
    max-width: 260px;
	}
	.credit-card:nth-of-type(2) {
		margin-right: 25px;
	}	
	.credit-card:last-of-type {
		margin-bottom: 0px;
	}
	.total-balance {
		    font-size: 22px;
	}
	.transaction-item_amount {
		width: 110px;
	}
}

@media(max-width: 390px) {
	.wallet {
		padding: 50px 25px;
	}
	.transactions-wrapper {
		padding: 50px 25px;
	}
	h2 {
		font: 18px/24px 'Open Sans', sans-serif;
	}
}
</style>
