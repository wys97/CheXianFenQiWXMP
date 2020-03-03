import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/pages/index'
import Enroll from '@/pages/enter/enroll'
import OutsideIndex from '@/pages/enter/outsideindex'
import Companyregister from '@/pages/enter/companyregister'
import EnrollOrderInquiry from '@/pages/enter/orderinquiry'
import PolicyDetails from '@/pages/enter/forDetails/policyDetails'
import RepaymentDetails from '@/pages/enter/forDetails/repaymentDetails'
import RoderDetails from '@/pages/enter/forDetails/roderDetails'
import EnrollIndex from '@/pages/enter/index'
import Dns from '@/pages/enter/dns'
import BusinessLicense from '@/pages/enter/businessLicense'
import IdcardRepre from '@/pages/enter/idcardRepre'
import Partners from '@/pages/enter/partners'
import IdcardGuarantor from '@/pages/enter/idcardGuarantor'
import CorporateAccounts from '@/pages/enter/corporateAccounts'
import FinanceHope from '@/pages/enter/financeHope'
import FaceVerify from '@/pages/enter/faceVerify/faceVerify'
import GuarantorFaceVerify from '@/pages/enter/faceVerify/guarantorFaceVerify'
import HotelNightLoan from '@/pages/enter/hotelNightLoan/hotelNightLoan'
import OTALoan from '@/pages/enter/otaLoan/otaLoan'

//入驻状态
import ApprovingWaitStatus from '@/pages/enter/enterStatus/approvingWaitStatus'
import WaitStatus from '@/pages/enter/enterStatus/waitStatus'
import TalkStatus from '@/pages/enter/enterStatus/talkStatus'
import FailedStatus from '@/pages/enter/enterStatus/failedStatus'
import PassStatus from '@/pages/enter/enterStatus/passStatus'
import KrIndex from '@/pages/enter/kr/krIndex'
import KrDetails from '@/pages/enter/kr/krDetails'

//电子合同
import EIndex from '@/pages/enter/eContract/eIndex'
//打款验证
import PaymentValid from '@/pages/enter/paymentValid/index'
import PaymentStatus from '@/pages/enter/paymentValid/paymentStatus'

//
import Login from '@/pages/smalMelting/login'
import FirstLogin from '@/pages/smalMelting/firstLogin'
import NoteVerify from '@/pages/smalMelting/noteVerify'
import Index from '@/pages/smalMelting/index'
import Finance from '@/pages/smalMelting/finance/index'
import FinanceContract from '@/pages/smalMelting/finance/financeContract'
import ApplyFinance from '@/pages/smalMelting/finance/applyFinance'
import RepaymentStyle from '@/pages/smalMelting/finance/repaymentStyle'
import FinanceDetail from '@/pages/smalMelting/finance/financeDetail'
import FinanceAccountList from '@/pages/smalMelting/finance/financeAccountList'
import FinanceRecords from '@/pages/smalMelting/finance/financeRecords'
import WaitingSign from '@/pages/smalMelting/finance/waitingSign'
import AccountReceivable from '@/pages/smalMelting/finance/accountReceivable'
import AccountReceivableDetail from '@/pages/smalMelting/finance/accountReceivableDetail'
import AccountReceivableOrder from '@/pages/smalMelting/finance/accountReceivableOrder'
import SelectCentreType from '@/pages/smalMelting/finance/selectCentreType'
import SelectAccount from '@/pages/smalMelting/finance/selectAccount'
import Repayment from '@/pages/smalMelting/repayment/index'
import PaymentVoucher from '@/pages/smalMelting/repayment/paymentVoucher'
import PaymentSuccess from '@/pages/smalMelting/repayment/paymentSuccess'
import RepaymentDetail from '@/pages/smalMelting/repayment/repaymentDetail'
import RepaymentRecords from '@/pages/smalMelting/repayment/repaymentRecords'
import RepaymentRecorded from '@/pages/smalMelting/repayment/repaymentRecorded'
import Profile from '@/pages/smalMelting/profile/index'
import AccountManage from '@/pages/smalMelting/profile/accountManage'
import AccountDetail from '@/pages/smalMelting/profile/accountDetail'
import AddOperator from '@/pages/smalMelting/profile/addOperator'
import ResetPasswords from '@/pages/smalMelting/profile/resetPasswords'
import CentreDetail from '@/pages/smalMelting/profile/centreDetail'
import ChoseFinanceMethod from '@/pages/smalMelting/finance/choseFinanceMethod'

//担保人
import GuarantorLogin from '@/pages/guarantor/login'
import GuarantorIndex from '@/pages/guarantor/index'
import GuarantorPersonalCenter from '@/pages/guarantor/personalCenter'

//静态页
import ServiceCharge from '@/pages/statusPages/serviceCharge'
import { outside } from 'semver'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            component: HomePage,
            redirect: '/enroll', //重定向
        },
        {
            path: '/enroll',
            name: 'enroll',
            component: Enroll,
        },
        {
            path: '/outsideindex',
            name: 'outsideindex',
            component: OutsideIndex,
        },
        {
            path: '/companyregister',
            name: 'companyregister',
            component: Companyregister,
        },
        {
            path: '/enter/orderinquiry',
            name: 'enrollOrderInquiry',
            component: EnrollOrderInquiry,
        },
        {
            path: '/enter/roderDetails/:id',
            name: 'roderDetails',
            component: RoderDetails,
        },
        {
            path: '/enter/policyDetails/:id',
            name: 'policyDetails',
            component: PolicyDetails,
        },
        {
            path: '/enter/repaymentDetails/:id',
            name: 'repaymentDetails',
            component: RepaymentDetails,
        },
        {
            path: '/enter/index',
            name: 'enrollIndex',
            component: EnrollIndex,
        },
        {
            path: '/enter/dns',
            name: 'ens',
            component: Dns
        },
        {
            path: '/enter/businessLicense',
            name: 'businessLicense',
            component: BusinessLicense
        },
        {
            path: '/enter/idcardRepre',
            name: 'idcardRepre',
            component: IdcardRepre
        },
        {
            path: '/enter/partners',
            name: 'partners',
            component: Partners
        },
        {
            path: '/enter/idcardGuarantor',
            name: 'idcardGuarantor',
            component: IdcardGuarantor
        },
        {
            path: '/enter/corporateAccounts',
            name: 'corporateAccounts',
            component: CorporateAccounts
        },
        {
            path: '/enter/financeHope',
            name: 'financeHope',
            component: FinanceHope
        },
        {
            path: '/enter/faceVerify/faceVerify/:status',
            name: 'faceVerify',
            component: FaceVerify
        },
        {
            path: '/enter/faceVerify/guarantorFaceVerify',
            name: 'guarantorFaceVerify',
            component: GuarantorFaceVerify
        },
        {
            path: '/enter/enterStatus/waitStatus',
            name: 'waitStatus',
            component: WaitStatus
        },
        {
            path: '/enter/enterStatus/approvingWaitStatus',
            name: 'approvingWaitStatus',
            component: ApprovingWaitStatus
        },
        {
            path: '/enter/enterStatus/talkStatus',
            name: 'talkStatus',
            component: TalkStatus
        },
        {
            path: '/enter/enterStatus/failedStatus',
            name: 'failedStatus',
            component: FailedStatus
        },
        {
            path: '/enter/enterStatus/passStatus/:id',
            name: 'passStatus',
            component: PassStatus
        },
        {
            path: '/enter/kr/krIndex',
            name: 'krIndex',
            component: KrIndex
        },
        {
            path: '/enter/kr/krDetails/:centreId',
            name: 'krDetails',
            component: KrDetails
        },
        {
            path: '/enter/eContract/eIndex',
            name: 'eIndex',
            component: EIndex
        },
        {
            path: '/enter/paymentValid/index',
            name: 'paymentValid',
            component: PaymentValid
        },
        {
            path: '/enter/paymentValid/paymentStatus/:status',
            name: 'paymentStatus',
            component: PaymentStatus
        },

        //
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/smalMelting/firstLogin/:bool',
            name: 'firstLogin',
            component: FirstLogin
        },
        {
            path: '/smalMelting/noteVerify/:mobile',
            name: 'noteVerify',
            component: NoteVerify
        },
        {
            path: '/smalMelting/finance/applyFinance/:receivableNos/:repaymentMethod/:repaymentMethodText/:financeMethod',
            name: 'applyFinance',
            component: ApplyFinance
        },
        {
            path: '/smalMelting/finance/repaymentStyle/:receivableNos/:financeAmt/:financeMonths/:repaymentMethod',
            name: 'repaymentStyle',
            component: RepaymentStyle
        },
        {
            path: '/smalMelting/finance/financeContract',
            name: 'financeContract',
            component: FinanceContract
        },
        {
            path: '/smalMelting/finance/waitingSign',
            name: 'waitingSign',
            component: WaitingSign
        },
        {
            path: '/smalMelting/finance/financeDetail/:id',
            name: 'financeDetail',
            component: FinanceDetail
        },
        {
            path: '/smalMelting/finance/financeAccountList/:id/:type',
            name: 'financeAccountList',
            component: FinanceAccountList
        },
        {
            path: '/smalMelting/finance/financeRecords',
            name: 'financeRecords',
            component: FinanceRecords
        },
        {
            path: '/smalMelting/finance/accountReceivableDetail/:id',
            name: 'accountReceivableDetail',
            component: AccountReceivableDetail
        },
        {
            path: '/smalMelting/finance/accountReceivableOrder/:id',
            name: 'accountReceivableOrder',
            component: AccountReceivableOrder
        },
        {
            path: '/smalMelting/finance/selectCentreType',
            name: 'selectCentreType',
            component: SelectCentreType
        },
        {
            path: '/smalMelting/finance/selectAccount',
            name: 'selectAccount',
            component: SelectAccount
        },
        {
            path: '/smalMelting/finance/choseFinanceMethod',
            name: 'choseFinanceMethod',
            component: ChoseFinanceMethod
        },
        {
            path: '/smalMelting/finance/accountReceivable',
            name: 'accountReceivable',
            component: AccountReceivable
        },
        {
            path: '/smalMelting/profile/accountManage',
            name: 'accountManage',
            component: AccountManage
        },
        {
            path: '/smalMelting/profile/accountDetail/:mobile/:name',
            name: 'accountDetail',
            component: AccountDetail
        },
        {
            path: '/smalMelting/profile/resetPasswords',
            name: 'resetPasswords',
            component: ResetPasswords
        },
        {
            path: '/smalMelting/profile/centreDetail',
            name: 'centreDetail',
            component: CentreDetail
        },
        {
            path: '/smalMelting/profile/addOperator',
            name: 'addOperator',
            component: AddOperator
        },

        {
            path: '/smalMelting/repayment/paymentVoucher',
            name: 'paymentVoucher',
            component: PaymentVoucher
        },
        {
            path: '/smalMelting/repayment/paymentSuccess',
            name: 'paymentSuccess',
            component: PaymentSuccess
        },
        {
            path: '/smalMelting/repayment/repaymentDetail/:id',
            name: 'repaymentDetail',
            component: RepaymentDetail
        },
        {
            path: '/smalMelting/repayment/repaymentRecords',
            name: 'repaymentRecords',
            component: RepaymentRecords
        },
        {
            path: '/smalMelting/repayment/repaymentRecorded/:id',
            name: 'repaymentRecorded',
            component: RepaymentRecorded
        },
        {
            path: '/hotelNightLoan/index',
            name: 'HotelNightLoan',
            component: HotelNightLoan
        },
        {
            path: '/OTALoan/index',
            name: 'OTALoan',
            component: OTALoan
        },
        {
            path: '/index',
            component: Index,
            children: [ //子路由
                {
                    path: '',
                    component: Finance,
                    meta: {
                        title: '融资'
                    },
                    redirect: 'finance', //重定向
                },
                {
                    path: 'finance',
                    name: 'finance',
                    component: Finance,
                    meta: {
                        title: '融资'
                    },
                    redirect: ''
                },
                {
                    path: 'repayment',
                    name: 'repayment',
                    component: Repayment,
                    meta: {
                        title: '还款'
                    }
                },
                {
                    path: 'profile',
                    name: 'profile',
                    component: Profile,
                    meta: {
                        title: '个人中心'
                    }
                },
            ]
        },
        //静态页
        {
            path: '/statusPages/serviceCharge',
            name: 'serviceCharge',
            component: ServiceCharge
        },
        //担保人
        {
            path: '/guarantor/login',
            name: 'guarantorLogin',
            component: GuarantorLogin
        }, {
            path: '/guarantor/index',
            name: 'guarantorIndex',
            component: GuarantorIndex
        }, {
            path: '/guarantor/personalCenter',
            name: 'guarantorPersonalCenter',
            component: GuarantorPersonalCenter
        }

    ]
})
