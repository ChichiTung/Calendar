import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from "vue-router";
const router = useRouter();


export const useFormStore = defineStore('form', () => {

    // 建立新比賽
    const isNewGame = ref(false)

    // 第一部分
      const competitionInfo = ref([{
        
            //競賽編號
            cid:'', 

            // 賽事狀態
            cState:'',
            // 審核狀態
            cReview:'',

            competitionName: '',  // 競賽名稱

            competitionType: 0,  // 選擇競賽層級

            competitionSubject:'',  // 競賽主旨
            
            competitionOrganizer1: '', // 主辦方
            competitionDirected:'', //指導
            competitionOrganizer2: '', // 承辦方
            competitionCoOrganizer:'', //協辦

            competitionApprovalNumber:'', //批准函號
            
            
            // 報名日期
            competitionOpeningDate:'',
            competitionClosingDate:'',
             // 競賽日期
            competitionStartDate:'',
            competitionEndDate:'',

            

            // 競賽地點
            fName1: '',
            fName2: '',
            fairways1: '',
            fairways2: '',
            fiD1: '',
            fiD2: '',

            // 人數
            competitionNumberOfParticipants: 0,
            // 資格
            competitionEligibility:'',


            
            }
        ]
           )

    // 帶入範例_主旨
    const fillSubject =() => {
    // console.log(competitionInfo.value[0].competitionSubject)
    competitionInfo.value[0].competitionSubject = '響應政府推展全民運動，關懷民眾體能健康，推廣我國人研發之木球運動，也增進與全國各地選手切磋球技，並提升木球技術水準，以達到競技與休閒之運動目的。'
    }

      // 帶入範例_參賽資格
    const fillEligibility =() => {
    // console.log(competitionInfo.value[0].competitionSubject)
    competitionInfo.value[0].competitionEligibility = '全國各木球協會、委員會及學校所屬木球隊，均可組隊報名參加。'
    }



    // 第二部分：賽制與分組
    // 賽制
    const competitionFormat= ref([])
    const addFormat = (formatName) => {
        const format = {
            name: formatName,
            categories:[],
        } 
        competitionFormat.value.push(format)
    }
     const deleteFormat =(number) => {
    console.log(number)
    // const index = competitionCategory.value.indexOf(number);
     competitionFormat.value.splice(number, 1);
    }
    const competition_starMethod = ref(0)

    // 組別(細節設定)
    const competitionCategory =ref([])
    const addCompetitionCategory = (gid) => {
        const category = {
            gid:gid,
            gName: '',
            gender: null,
            lowAge: '',
            upAge:'',
        }
        competitionCategory.value.push(category);
    }
    const deleteCompetitionCategory =(number) => {
    console.log(number)
    // const index = competitionCategory.value.indexOf(number);
     competitionCategory.value.splice(number, 1);
    }

     // 加賽制到組別中
    const addSidToCategory =(categoryID,sid) => {

      if ("sidList" in competitionCategory.value[categoryID]) {
    competitionCategory.value[categoryID].sidList.push(sid);
} else {
    competitionCategory.value[categoryID].sidList = [sid];
}
    }

    // 刪除組別的賽制
        const deleteSidToCategory =(categoryID,sid) => {

    // 假設 competitionCategory.value[categoryID] 已經存在
if ("sidList" in competitionCategory.value[categoryID]) {
    // 取得 "sidList" 陣列
    const sidList = competitionCategory.value[categoryID].sidList;

    const index = sidList.indexOf(sid);
    if (index !== -1) {
        sidList.splice(index, 1);
    }
}
    }

// 個桿組別
    const singleCategory = ref([])

    const addSingleCategory = (category, categoryID ) => {

      const categoryIndex = singleCategory.value.indexOf(category )
      //  console.log(`playerIndex`+playerIndex)

      if(categoryIndex == -1){
        singleCategory.value.push(category)
        addSidToCategory(categoryID,1)
        //  competitionCategory.value[categoryID].sidList[0].push(1)
      }else{
        singleCategory.value.splice(categoryIndex, 1)
        deleteSidToCategory(categoryID,1)
        // const sidIndex =   competitionCategory.value[categoryID].sidList[0].indexOf(1)
        // competitionCategory.value[categoryID].sidList[0].splice(sidIndex,1)
      }

      console.log(competitionCategory.value[categoryID])
    }

   

// 團桿組別
    const bothCategory = ref([])

    const addBothCategory = (category, categoryID ) => {

      const categoryIndex = bothCategory.value.indexOf(category )
      console.log(categoryIndex)
      //  console.log(`playerIndex`+playerIndex)

      if(categoryIndex == -1){
        bothCategory.value.push(category )
        addSidToCategory(categoryID,4)
      }else{
          bothCategory.value.splice(categoryIndex, 1)
        deleteSidToCategory(categoryID,4)

        //  console.log(bothCategory.value)
      }
    }

   

    // 聯絡資料
    const competition_contact_money = ref([
        {
            competition_contact_Line:'',
            competition_contact_phone:'',
            competition_contact_email:'',
        },
        {
            competition_prizeMoney:'',
            competition_prizeRules:'',
        },
         {
             competition_registrationFee: 0, //幣別
            competition_registrationFeeRules:'',
        }

    ],
    
    )
    

     // 帶入範例_報名費細項
    const fillRegistrationFee =() => {

   competition_contact_money.value[2].competition_registrationFeeRules= '每人新臺幣100元。'
    }

      // 帶入範例_競賽獎勵與獎金
    const fillPrize =() => {

  competition_contact_money.value[1].competition_prizeRules= '（一）各組取前6名頒獎，前3名頒發獎盃、第4~6名頒發獎牌。\n（二）所有球道一桿過門頒發新臺幣100元，不限次數。'
    }

    // 第三部分：其他資訊
     const competition_others= ref([
        {
            competitionDetails:'', //競賽辦法細節
            competitionOther:'', //其他公告
        }
    ],
    )

       // 帶入範例_競賽辦法細節
    const fillDetails =() => {

 competition_others.value[0].competitionDetails= '（一）競賽規則：依據國際木球總會公佈之最新木球規則。\n（二）競賽球具：採用中華民國木球總會檢定合格之球具。\n（三）競賽制度：個人桿數賽，分為預賽與決賽，每輪12球道。所有參加選手完成預賽後，各組取前3分之1名選手進入決賽，最後以預賽+決賽共24球道總桿數多寡判定優勝名次，總桿數低者為勝。\n（四）成績相同勝負判定：若有2名（含）以上選手桿數相同時，以最後12球道中桿數低的球道多者為勝；若仍相同時，以最後第12球道桿數低者為勝；若仍相同時，以最後第11球道桿數低者為勝，依此類推。預賽若有選手棄權時不遞補，決賽若勝負判定情況完全相同時，名次並列；惟第1名相同時，由大會指定球道加賽直至分出勝負為止。\n（五）競賽規定：1. 競賽進行中，不得進入球場內練球，且不得抽煙、嚼檳榔，違者成績不列入紀錄。2. 線內發球，各球道打擊桿數9桿仍未過門即停止打擊，以10桿計算。3. 不得使用球桿碰觸球門、球瓶擋停，或單手擊球、持球推送者，違者皆加罰1桿。4. 各組選手須依球道及發球順序進行競賽，不得跳道，違者皆加罰1桿。5. 不接受當天報名，且未經大會同意，私下變更或對調場次者，違者成績不列入紀錄。6. 凡競賽發生木球規則或競賽規程中無明文規定之爭議時，由大會裁判長裁決之。'    }
     // 帶入範例_其他事項

    const fillOthers =() => {

  competition_others.value[0].competitionOther= '（一）若遇颱風、豪雨及雷雨…等自然災害，將於競賽前1天通知各隊延期訊息，以行政院人事行政總處發佈臺北市地區訊息為準。\n（二）若下雨照常舉行，大會將視情況進行球道縮減3分之1，並標示嚴重積水處，等距移出不罰桿。\n（三）參與選手及人員請自備雨具、環保碗筷、球桿及球…等相關個人物品，大會不予提供。\n（四）頒獎典禮時，所有得獎選手，必須親自或指定代領人出席領獎，如唱名未到視同棄權。'
    }

    const clearCompetitions = () =>{
localStorage.removeItem('competitionInfo')
localStorage.removeItem('competitionFormat')
localStorage.removeItem('competitionCategory')
localStorage.removeItem('competition_contact_money')
localStorage.removeItem('competition_others')
    }


    


    
    return { 
        competition_starMethod,
        competitionInfo,
        fillSubject,
        fillEligibility,
        isNewGame,
        clearCompetitions,
       
       
        

        competitionFormat,
        addFormat,
        deleteFormat,
        competitionCategory,
        addCompetitionCategory,
        deleteCompetitionCategory,
        singleCategory,
        bothCategory,
        addSingleCategory,
        addBothCategory,
        fillRegistrationFee,
        fillPrize, 

        // 賽制與分組設定
        competition_contact_money,

        // 其他資訊
        competition_others,
        fillOthers,
        fillDetails,

    }
},
{
    persist: [
{
    key:'isNewGame',
    paths: ['isNewGame']
  },
{
    key:'competitionInfo',
    paths: ['competitionInfo']
  },
 
   {
    key:'competitionFormat',
    paths: ['competitionFormat']
  },
  {
    key:'competitionCategory',
    paths: ['competitionCategory']
  },
  {
    key:'competition_contact_money',
    paths: ['competition_contact_money']
  },
   {
    key:'competition_others',
    paths: ['competition_others']
  },
 {
    key:'singleCategory',
    paths: ['singleCategory']
  },
  {
    key:'bothCategory',
    paths: ['bothCategory']
  },
  




]
})