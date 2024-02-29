<template>
    <div class="w-full h-auto mb-[30px] md:px-[3vw] lg:px-[4vw] ">
     <!-- 未展開 -->
    <div  v-if="open"
    class="rounded-[20px]  h-[96px]  bg-[#EEE] w-full l text-[24px] text-[#999] leading-[96px] px-[30px] mb-[30px]
    flex  justify-between  drop-shadow-lg items-center"
    :class="{'text-[#222] bg-white' : scheduleExist}">
      
      <div class="flex gap-[10px] items-center ">
        <img v-if="!scheduleExist"
        src="../../../assets/images/admin/check.png" class="w-[30px] h-[30px] ">
        <img v-else src="../../../assets/images/admin/check_black.png" class="w-[30px] h-[30px] ">

        <p :class="$store.competitionInfo[0].cState<2 ? 'text-[#999]' : 'text-[#222]'"
        class="font-semibold">安排競賽日程</p>
      </div>
      <button    @click="toggle_showSchedule()" 
      :disabled="$store.competitionInfo[0].cState<2"
      >
        <img  src="../../../assets/images/admin/drop.png" class="w-[32px] h-[16px]">
      </button>
    </div>

    <!-- 展開 -->
    <div v-else
    class="rounded-[20px]  h-auto pb-[10px]  bg-[#FFF] w-full  px-[30px] mb-[30px]
     drop-shadow-lg items-center">
 
    <!-- 標題列 -->
    <div class=" flex  justify-between items-center leading-[96px] mb-[20px]" id="hold_Section4">
      <div class="flex gap-[10px] items-center text-[24px] text-[#222] font-semibold">
         <img v-if="!scheduleExist"
        src="../../../assets/images/admin/check.png" class="w-[30px] h-[30px] ">
        <img v-else src="../../../assets/images/admin/check_black.png" class="w-[30px] h-[30px] ">
      <p>安排競賽日程</p>
      </div>

       <button    @click="toggle_showSchedule()">
        <img src="../../../assets/images/admin/drop.png" class="w-[32px] h-[16px] rotate-180">
      </button>
    </div>

    <!-- 球場 日期列 -->
    <div class="w-full flex gap-[10px]  mb-[30px]">
      <!-- 場地 -->
      <select v-model="chosenFid"
										class="bg-white w-[260px] h-[44px] mr-[20px] border-[1px] border-solid border-[#999] rounded-[4px] text-start   font-medium text-[16px] pr-[50px] pl-3 disabled:bg-white
                    hover:outline-none hover:border-black_m hover:ring-0
                    focus:outline-none focus:border-black_m focus:ring-0"
										>
											<option	v-for="(option, index) in  fidOption"
						          :key="option"			:value="option"
						          style="padding-bottom: 20px; font-weight: 200;"	>
						              {{ option.fName }}
					            </option>
				</select>

      <!-- 日期列 -->
      <div class="w-full flex justify-start   gap-[10px] items-center ">

        <!-- 上一頁 -->
          <button @click="changePage(-1)"  
           :disabled="nowPage===1"
          class=" cursor-pointer ">
              <img v-if="nowPage===1"
              src="../../../assets/images/arrow-disabled.png" class=" w-[24px] h-[24px] ">
              <img v-else
              src="../../../assets/images/arrow-right.png" class=" w-[24px] h-[24px] rotate-180">
          </button>


      <!-- 日期選項 -->
      <div v-for="(date, index) in fiveCompetitions">

             <button    @click="toggle_chosenDate(date,index)"
              class=" h-[36px] px-[12px] py-[6px] rounded-[50px] text-center leading-[36px] text-black_m bg-gray_lightest flex gap-[10px]
              disabled:bg-gray_m disabled:text-gray_l "
              :class="{'bg-green_l': chosenDate.showDate == date.showDate}">

              <!-- !!有賽程的提示點 -->
              <div v-if="fiveCompetitions_sessions[index] !==''"
              class="w-[14px] h-[14px] rounded-full bg-gray_m "
               :class="{'bg-green_m': chosenDate.showDate == date.showDate}"></div>

              <p>{{ date.showDate }}</p>
            </button>

      </div>

     
    <!-- 下一頁按鈕 -->
      <button @click="changePage(1)"
     :disabled="nowPage ==pageCount"
      class=" cursor-pointer ">
        <img v-if="nowPage ==pageCount"
        src="../../../assets/images/arrow-disabled.png" class=" w-[24px] h-[24px] rotate-180">
        <img v-else
        src="../../../assets/images/arrow-right.png" class=" w-[24px] h-[24px] ">
      </button>

      	
      </div>

    </div>

    <!-- 新增場次 列 -->
    <div class="w-full flex gap-[20px] items-center justify-end mb-[30px]">
       <button      @click="toggle_showGameSchedule()"
        class="w-[132px] h-[40px] rounded-[50px] text-center leading-[40px]   
        border-[1px] border-black_m text-black_m
        disabled:bg-gray_m disabled:text-gray_l ">
           檢視賽程表
        </button>

        <button   @click="toggle_showAddRound_new()"
        class="w-[132px] h-[40px] rounded-[50px] text-center leading-[40px]   
        border-[1px] border-black_m text-black_m
        disabled:bg-gray_m disabled:text-gray_l ">
        <span class="text-[25px] mr-[5px]">+ </span>
            新增場次
        </button>
      
    </div>

    <!-- 時間區段 -->
    <div class="pb-[60px] relative">
      <div  v-for="(time, index) in timeArray">
        <button @click="PickTime(index)"
        class="w-full h-[80px] p-[10px] border-b-[1px] border-gray_l  hover:bg-gray_lightest flex justify-start  items-start"  :class="{'border-none': index==timeArray.length-1}" >
          <!-- 時間 -->
          <div class="text-[14px] text-[600] text-gray_m">{{ time }}</div>
        </button>
        
      </div>

      <!-- 賽程 區塊 -->
      <div  class="w-[800px] h-[1040px] absolute top-0 left-[100px] pointer-events-none">
      <div  v-for="(game, index) in fiveCompetitions_sessions[chosenDate_index]"
      @click="openExistGame(game)"
      class="w-[800px] h-[106px] p-[10px] rounded-[4px] bg-blue_l border-[1px] border-blue_m absolute pointer-events-auto cursor-pointer"
      :style="{ top: calculateTop(game.seStart) + 'px',
      backgroundColor: game.roundID<200 ? '#efefef' : (game.roundID<300 ? '#E2FAFF' : '#C6ECF4'),
      borderColor:  game.roundID<200 ? '#999999' : (game.roundID<300 ? '#12AFCE' : '#0A67AB'),}"
      >
        <!-- 標題 -->
        <h4 class="text-[20px] leading-[30px]">{{ game.seName }} ({{ game.seStart }} ~ {{ game.seEnd }}) &nbsp; <span></span></h4>

        <p :class="{'text-blue_d':game.roundID>199, 'text-gray_d': game.roundID<200}" >尚有 {{ game.seats }} 個空位 </p>
        <!-- (此輪共  人，還有   人未排入) -->

        <!-- 編輯按鈕 -->
        <div class="absolute top-[10px] right-[10px]">
          <svg v-if="game.roundID<200"
          width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.2214 3.27762L14.722 7.7782L4.9492 17.551L0.936568 17.994C0.399395 18.0534 -0.0544605 17.5992 0.00530355 17.062L0.451776 13.0466L10.2214 3.27762ZM17.5056 2.60756L15.3924 0.494372C14.7333 -0.164791 13.6642 -0.164791 13.005 0.494372L11.017 2.48241L15.5176 6.98299L17.5056 4.99496C18.1648 4.33544 18.1648 3.26672 17.5056 2.60756Z" fill="#666666"/></svg>
          <svg v-else
          width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.2214 3.27762L14.722 7.7782L4.9492 17.551L0.936568 17.994C0.399395 18.0534 -0.0544605 17.5992 0.00530355 17.062L0.451776 13.0466L10.2214 3.27762ZM17.5056 2.60756L15.3924 0.494372C14.7333 -0.164791 13.6642 -0.164791 13.005 0.494372L11.017 2.48241L15.5176 6.98299L17.5056 4.99496C18.1648 4.33544 18.1648 3.26672 17.5056 2.60756Z" fill="#0A67AB"/></svg>

        </div>

      </div>
      </div>

      

    </div>
 
         


    <!-- 檢視賽程表 按鈕 -->
    <div class="w-full flex justify-end pb-[20px] gap-[20px]">
       <button  @click=""
        class="w-[132px] h-[40px] rounded-[50px] text-center leading-[40px]   
        border-[1px] border-black_m text-black_m
        disabled:bg-gray_m disabled:text-gray_l ">
            檢視賽程表
        </button>
     
      
      <button :disabled= "approving || submitDisabled"   v-if="!approving && $store.competitionInfo[0].competitionType != 0"
      @click="submitSection4(1)"
        class="w-[149px] h-[40px] rounded-[50px] text-center leading-[40px] text-white bg-green_m disabled:bg-gray_m disabled:text-gray_l ">
           儲存競賽日程
        </button>
        
    </div>
      
  <div>

      
        </div>
    </div>

        <div>
        </div>
   </div>



<addRound :open="showAddRound"  :tid="tid"
:chosenDate ='chosenDate' :chosenFid='chosenFid' 
:all_playersList="all_playersList" :all_playersList_teams="all_playersList_teams" :unscheduledPlayerList="unscheduledPlayerList"
 :isNewRound="isNewRound"
@close="toggle_showAddRound"></addRound>

  <!-- 賽程表 -->
  <!-- <GameSchedule :open="showGameSchedule"
  :gameSchedule="gameSchedule"
  :transformedData = 'transformedData'
   :fidOption="fidOption" 
   :chosenFid="chosenFid" :chosenDate ='chosenDate'
  :fiveCompetitions = 'fiveCompetitions'
  :fiveCompetitions_sessions ='fiveCompetitions_sessions'
  @close="toggle_showGameSchedule"></GameSchedule> -->

</template>

<script setup>
    import {
	ref,
	onMounted,
	onUnmounted,
	reactive,
	computed,
	watch,
	nextTick,
  defineProps
} from "vue";

import { useFormStore } from "../../../src/stores/form";
const $store = useFormStore();
import { useScheduleStore } from "../../../src/stores/schedule";
const $ScheduleStore = useScheduleStore();

import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();

import addRound from '../../components/Hold_Step3/AddRound.vue'
// import GameSchedule from '../../components/Hold_Step3/GameSchedule.vue'



const emits = defineEmits()
const { open, tid, userToken, } = defineProps([ 'open','tid', 'userToken',]);

const now_cid = route.params.cid


// 展開 section
const showSchedule = ref(false)
const toggle_showSchedule=()=>{
  showSchedule.value = !showSchedule.value
  if(showSchedule) {
    emits('showSchedule')
  }
}

// section 狀態
const scheduleExist = ref(false)


// 地點
const fidOption = ref([ ])
onMounted(()=>{
  fidOption.value.push({
    fName:  $store.competitionInfo[0].fName1,
    fid:$store.competitionInfo[0].fiD1})
    
  if($store.competitionInfo[0].fName2!==''){
    fidOption.value.push({
    fName:  $store.competitionInfo[0].fName2,
    fid:$store.competitionInfo[0].fiD2})
  }
  chosenFid.value = fidOption.value[0]
  $ScheduleStore.chosenFid = chosenFid.value.fid
})
const chosenFid=ref('')
watch(chosenFid,(newVal,oldVal)=>{
  if(newVal!=oldVal){
$ScheduleStore.chosenFid = newVal.fid
  }
})

// 選擇地點改變
// watch(chosenFid, (newVal,oldVal)=>{
// if(newVal!=oldVal && oldVal!='' ) {
//  changePage(1)
//  changePage(-1)
// }
// })




// 日期
// 日期陣列
const dateArray = ref([])
const chosenDate = ref('')
const chosenDate_index = ref(0)
const toggle_chosenDate = (date, index) => {
  chosenDate.value = date
  $ScheduleStore.chosenDate = chosenDate.value.apiDate
  chosenDate_index.value = index
}

//處理日期格式 
onMounted(() => {
  const startDate = new Date($store.competitionInfo[0].competitionStartDate);
  const endDate = new Date($store.competitionInfo[0].competitionEndDate);

  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    
      const formattedDate = currentDate.toLocaleDateString('en-US', {
      month: 'numeric',  //2/6
      day: 'numeric', 
      // month: '2-digit', // 02/06
      // day: '2-digit',
     });

      const formattedDate_year = currentDate.toLocaleDateString('en-US', {
      year: 'numeric', 
      // month: 'numeric',  //2/6
      // day: 'numeric', 
      month: '2-digit', // 02/06
      day: '2-digit',
     });
   

     const formattedDate_popup= `${formattedDate_year.split('/')[2]}/${formattedDate_year.split('/')[0]}/${formattedDate_year.split('/')[1]}`;
     

     dateArray.value.push(
      {
        // popupDate: ,
        realDate: new Date(currentDate),
        showDate: `${formattedDate}(${getChineseWeekday(currentDate.getDay())})`,
        popupDate: formattedDate_popup,
        apiDate: formatDateToISO(formattedDate_popup),
      }
      );
    currentDate.setDate(currentDate.getDate() + 1);
  }
 
  chosenDate.value=dateArray.value[0]
  $ScheduleStore.chosenDate = chosenDate.value.apiDate
  
})

// 將英文星期轉換為中文星期
function getChineseWeekday(weekday) {
  const chineseWeekdays = ['日', '一', '二', '三', '四', '五', '六'];
  return chineseWeekdays[weekday];
}

// 轉為 api 格式
function formatDateToISO(dateString) {
  const [year, month, day] = dateString.split('/');
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}

// 切換日期頁 功能
const nowPage = ref(1)
const datePerPage = ref(5)

// 計算總頁數
const pageCount = computed(() =>Math.ceil(dateArray.value.length / datePerPage.value));

// 計算當前頁數的競賽資料
const fiveCompetitions = computed(() => {
  const startIndex = (nowPage.value - 1) * datePerPage.value;
  const endIndex = startIndex + datePerPage.value;
  return dateArray.value.slice(startIndex, endIndex);
});


const changePage =(index) =>{
  fiveCompetitions_sessions.value = []
if(index=== 1 &&  nowPage.value < pageCount.value) {
nowPage.value++
}else if(index===-1 && nowPage.value > 1) {
nowPage.value -=1
}}

// 帶入五天所有日期資料
const fiveCompetitions_sessions = ref([])

watch(fiveCompetitions, async (newVal,oldVal)=>{  
  if(newVal !=oldVal) {
    for (const item of newVal) { //用非同步等資料完全跑完再推陣列，才不會發生連續日期日程有誤的狀況
      await getAllSessions_five(item.apiDate, chosenFid.value.fid);
    }
  }
})


// 檢視賽程表
const showGameSchedule = ref(false)
const toggle_showGameSchedule =() =>{
  showGameSchedule.value=!showGameSchedule.value
  
  if(showGameSchedule.value == true) SelSessionsDetails(chosenDate)
}

const gameSchedule = ref([])

// 時間區段
const timeArray =['上午 07:00', '上午 08:00', '上午 09:00', '上午 10:00', '上午 11:00', '下午 12:00', '下午 01:00',  '下午 02:00',  '下午 03:00',  '下午 04:00',  '下午 05:00',  '下午 06:00',  '下午 07:00',]

const PickTime=(index)=> {

  if(allGames.value !=[]) {

  const hour = index+7

   let temp_time;
   let sameHourGames;

  if(hour>=10) {
     temp_time = `${hour}:00`
      // 取得相同 hour 部分的所有資料
   sameHourGames = allGames.value.filter(game => game.seEnd.startsWith(`${hour}:`));
  }else {
     temp_time = `0${hour}:00`
      // 取得相同 hour 部分的所有資料
  sameHourGames = allGames.value.filter(game => game.seEnd.startsWith(`0${hour}:`));
  }



  if (sameHourGames.length > 0) {
    // 找到同 hour 部分的最大結束時間
    const maxEndTime = sameHourGames.reduce((max, game) => {
      const endTime = game.seEnd.split(':').map(Number);
      const maxTime = max.split(':').map(Number);
      return (endTime[0] > maxTime[0] || (endTime[0] === maxTime[0] && endTime[1] > maxTime[1])) ? game.seEnd : max;
    }, sameHourGames[0].seEnd);

    // 如果最大結束時間比 temp_time 大，則替換 temp_time
    if (maxEndTime > temp_time) {
      temp_time = maxEndTime;
    }
  }

  
  $ScheduleStore.nowGameInfo.seStart = temp_time
}else {
  const hour = index+7

   let temp_time;
   let sameHourGames;

  if(hour>=10) {
     temp_time = `${hour}:00`
  }else {
     temp_time = `0${hour}:00`
  }
    $ScheduleStore.nowGameInfo.seStart = temp_time
}
// $ScheduleStore.chosenFid = chosenFid.value.fid
// $ScheduleStore.chosenDate = chosenDate.value.apiDate


toggle_showAddRound_new()
}

// 場次 data\
const allGames = ref([])

// 場次時間 計算top 的function
const calculateTop = (startTime) => {
  // 把開始時間轉為分鐘
  const [hour, minute] = startTime.split(':').map(Number); 
  const startMinutes = hour * 60 + minute;
 
  const topOffset = ((startMinutes - 7 * 60) / 30) * 40;  // 計算 top 位置
  
  return topOffset;
}; 

const showAddRound =ref(false)  //顯示新增場次
const isNewRound =ref(false)  //是否為新場次


// 新增場次-從時間列表
const toggle_showAddRound =() => {
  showAddRound.value = !showAddRound.value
isNewRound.value = false
}

// 新增場次
const toggle_showAddRound_new =() => {
$ScheduleStore.timePicked = ''
showAddRound.value = !showAddRound.value
isNewRound.value = true
}
const GameInfo =$ScheduleStore.nowGameInfo

// 開啟舊有場次
const openExistGame=(game)=>{


  // 資料推進 store
  GameInfo.tid =tid
  GameInfo.cid =$store.competitionInfo[0].cid

  GameInfo.seid =game.seid
  GameInfo.seName = game.seName
  GameInfo.seDate = game.seDate
  GameInfo.seStart = game.seStart
  GameInfo.seEnd = game.seEnd
  GameInfo.fid = game.fid
  GameInfo.fName = game.fName
  GameInfo.defState = game.defState
  GameInfo.roundID = game.roundID

  if(game.seName.includes('團體')){
    GameInfo.sid =4
  }else if(game.seName.includes('雙人')){
    GameInfo.sid =2
  }else if(game.seName.includes('球道')){
    GameInfo.sid =3
  }else {
    GameInfo.sid =1
  }

  console.log('$ScheduleStore.nowGameInfo',GameInfo)

  SelSessionsList(game.seid)

  if(GameInfo.roundID>200){
    SelSessionsRankingList()
  }else {
    SelSessionsPlayerList()
  }
  



  $ScheduleStore.timePicked = game.seStart
  $ScheduleStore.timePicked_end = game.seEnd
  showAddRound.value = !showAddRound.value
  isNewRound.value = false
}

// Api


watch(chosenDate,(newVal,oldVal)=>{
if(newVal!=oldVal) {
  console.log('nowDateDate', chosenDate.value )
  getAllSessions(chosenDate.value.apiDate,chosenFid.value.fid )
}
})

const getAllSessions= async (chosenDate, chosenFid) => {
  const requestBody = {
					tid: tid,
          cid: now_cid,
          seDate: chosenDate,
          fid:chosenFid,

		};
    console.log(requestBody)
    // return

	try {
		const response = await fetch(
			`https://api.antqtech.com/Woodball_Test/Competition/SelSessions`,
			{
				method: "POST",
				 headers: {
					"Content-Type": "application/json",
          Authorization: userToken,
				},
        body: JSON.stringify(requestBody),
      }
		
		);
		const data = await response.json();



		if (response.status === 200) {

      // 將時間格式改為只顯示到分鐘
      const formattedData = data[0].data1.map(session => ({
        ...session,
        seStart: session.seStart.slice(0, 5), // 取出時和分
        seEnd: session.seEnd.slice(0, 5), 
        seDate: session.seDate.slice(0, 10), 
      }));

    allGames.value = formattedData
    console.log('allGames.value', allGames.value)

    // console.log('formattedData', formattedData)
    // console.log('data[0].data1', data[0].data1)
		}else {
      if(data[0].msg !='查無場次資料！'){
        console.log(data)

      }

    allGames.value = ''

    }
	} catch (error) {

		console.error("Error fetching data:", error);
	}
};

// 抓日期列的狀態
const getAllSessions_five= async (chosenDate, chosenFid) => {
  const requestBody = {
					tid: tid,
          cid: now_cid,
          seDate: chosenDate,
          fid:chosenFid,

		};
    // console.log(requestBody)
    // return

	try {
		const response = await fetch(
			`https://api.antqtech.com/Woodball_Test/Competition/SelSessions`,
			{
				method: "POST",
				 headers: {
					"Content-Type": "application/json",
          Authorization: userToken,
				},
        body: JSON.stringify(requestBody),
      }
		
		);
		const data = await response.json();



		if (response.status === 200) {

      // 將時間格式改為只顯示到分鐘
      const formattedData = data[0].data1.map(session => ({
        ...session,
        seStart: session.seStart.slice(0, 5), // 取出時和分
        seEnd: session.seEnd.slice(0, 5), 
        seDate: session.seDate.slice(0, 10), 
      }));

    // allGames.value = formattedData
    fiveCompetitions_sessions.value.push(formattedData)
    if(formattedData){scheduleExist.value = true; console.log('scheduleExist.value', scheduleExist.value)}


		}else {

     if(data[0].msg !='查無場次資料！'){
        console.log(data)
      }
    allGames.value = ''
    fiveCompetitions_sessions.value.push('')
    }

	} catch (error) {

		console.error("Error fetching data:", error);
	}
};

// 查看該場比賽的已排選手
const SelSessionsList= async (seid) => {
  const requestBody = {
					tid: tid,
          cid: now_cid,
          // seid: seid,

          //測試資料 
          seid: seid,

		};
    // console.log('SelSessionsList', requestBody)
    // return

	try {
		const response = await fetch(
			`https://api.antqtech.com/Woodball_Test/Competition/SelSessionsList`,
			{
				method: "POST",
				 headers: {
					"Content-Type": "application/json",
          Authorization: userToken,
				},
        body: JSON.stringify(requestBody),
      }
		
		);
		const data = await response.json();



		if (response.status === 200) {
      console.log('選手名單',data)

      $ScheduleStore.originPlayersCount = data[0].data1.length //計算該場比賽已有多少選手

       let maxClassID = 0; // 初始化最大的 classID
         for (const item of data[0].data1) {
        const { classID } = item;
          if (classID > maxClassID) {  maxClassID = classID; } //看要增加多少列
        }

        // console.log('maxClassID', maxClassID)

      //  從第一道開始，先生成陣列
        if(GameInfo.defState==1){

        //  for (const item of data[0].data1) {
        // const { classID } = item;
        //   if (classID > maxClassID) {  maxClassID = classID; } //看要增加多少列
        // }

         $ScheduleStore.temp_playersInSessions = new Array(maxClassID).fill(null).map(() => ({
          sTime: '',
          rowPlayers: Array.from({ length: 5 }, () => ({}))
          }));

        for (const item of data[0].data1) {
        const { classID, sSort, sTime } = item;
        console.log('item', item)

        // 推時間
          $ScheduleStore.temp_playersInSessions[classID-1].sTime = sTime.substring(0, 5); 
          $ScheduleStore.temp_playersInSessions[classID-1].rowPlayers[sSort-1] = item;
    }

          
    console.log(' $ScheduleStore.temp_playersInSessions',  $ScheduleStore.temp_playersInSessions)

      }else {
     

       for (const item of data[0].data1) {
        const { classID, sSort } = item;
        // console.log('item', item)
       $ScheduleStore.temp_playersInSessions[classID-1].rowPlayers[sSort-1] = item;
    }

    console.log(' $ScheduleStore.temp_playersInSessions',  $ScheduleStore.temp_playersInSessions)
      }


		}else {
    console.log(data)
    }

	} catch (error) {

		console.error("Error fetching data:", error);
	}
};

// 查賽程安排的選手列表
const SelSessionsDetails= async () => {
  const requestBody = {
					// fid: chosenFid.value.fid,
          // cid: now_cid,
          // seDate: chosenDate.value.realDate,

    // !!測試
          fid: $ScheduleStore.chosenFid,
          cid: now_cid,
          seDate: $ScheduleStore.chosenDate,
   


		};
    console.log('SelSessionsDetails', requestBody)
    // return

	try {
		const response = await fetch(
			`https://api.antqtech.com/Woodball_Test/Competition/SelSessionsDetails`,
			{
				method: "POST",
				 headers: {
					"Content-Type": "application/json",
          Authorization: userToken,
				},
        body: JSON.stringify(requestBody),
      }
		
		);
		const data = await response.json();



		if (response.status === 200) {
      
    console.log('200200200', data[0].data1);
    const gameScheduleData = data[0].data1;

      gameSchedule.value = gameScheduleData.map(item => {
        const sessionsDetails = item.sessionsDetails.reduce((acc, sessionDetail) => {
            const existingSession = acc.find(existing => existing.sTime === sessionDetail.sTime);
            if (existingSession) {
                const rowPlayers = Array.from({ length: 5 }, (_, index) => {
                    const sessionDetailForRowPlayer = item.sessionsDetails.find(detail => detail.sSort === index + 1 && detail.classID === sessionDetail.classID);
                    if (sessionDetailForRowPlayer) {
                        return {
                            classID: sessionDetailForRowPlayer.classID,
                            gName: sessionDetailForRowPlayer.gName,
                            pName1: sessionDetailForRowPlayer.pName1,
                            pName2: sessionDetailForRowPlayer.pName2,
                            preGName: sessionDetailForRowPlayer.preGName,
                            preRanking: sessionDetailForRowPlayer.preRanking,
                            sSort: sessionDetailForRowPlayer.sSort,
                            sTime: sessionDetailForRowPlayer.sTime,
                            tName: sessionDetailForRowPlayer.tName,
                        };
                    } else {
                        return {};
                    }
                });
                existingSession.rowPlayers = rowPlayers;
            } else {
                const rowPlayers = Array.from({ length: 5 }, (_, index) => {
                    const sessionDetailForRowPlayer = item.sessionsDetails.find(detail => detail.sSort === index + 1 && detail.classID === sessionDetail.classID);
                    if (sessionDetailForRowPlayer) {
                        return {
                            classID: sessionDetailForRowPlayer.classID,
                            gName: sessionDetailForRowPlayer.gName,
                            pName1: sessionDetailForRowPlayer.pName1,
                            pName2: sessionDetailForRowPlayer.pName2,
                            preGName: sessionDetailForRowPlayer.preGName,
                            preRanking: sessionDetailForRowPlayer.preRanking,
                            sSort: sessionDetailForRowPlayer.sSort,
                            sTime: sessionDetailForRowPlayer.sTime,
                            tName: sessionDetailForRowPlayer.tName,
                        };
                    } else {
                        return {};
                    }
                });
                acc.push({
                    sTime: sessionDetail.sTime,
                    rowPlayers: rowPlayers
                });
            }
            return acc;
        }, []);

        return {
            seid: item.seid,
            seName: item.seName,
            defState: item.defState,
            sessionsDetails: sessionsDetails
        };
    });

    console.log('gameSchedule.value', gameSchedule.value);
    
		}else {
    console.log(data)
    }

	} catch (error) {

		console.error("Error fetching data:", error);
	}
};


const all_playersList =ref([])
const all_playersList_teams =ref([])
const unscheduledPlayerList = ref([]) //未排入的選手資料


// 查看待排入的選手(複賽、決賽)
const  SelSessionsRankingList= async () => {
  const requestBody = {
					tid: tid,
          cid: now_cid,

          // 測試
          sid: GameInfo.sid,
          roundID: GameInfo.roundID,

		};
    console.log('SelSessionsRankingListRQB', requestBody)
    // return
	try {
		const response = await fetch(
			`https://api.antqtech.com/Woodball_Test/Competition/SelSessionsRankingList`,
			{
				method: "POST",
				 headers: {
					"Content-Type": "application/json",
          Authorization: userToken,
				},
        body: JSON.stringify(requestBody),
      }
		
		);

    

		const data = await response.json();
    console.log('SelSessionsRankingListRQBSelSessionsRankingListRQBSelSessionsRankingListRQBSelSessionsRankingListRQB',data)



		if (response.status === 200) {
      
			console.log('成功查詢 SelSessionsRankingList (測試複賽)：', data )
      all_playersList.value = data.playerList  //所有選手資料

      all_playersList_teams.value = all_playersList.value.reduce((acc, currentPlayer) =>{

        const existingTeam = acc.find(item=> item.tName === currentPlayer.tName);
        if(existingTeam) {
          existingTeam.players.push(currentPlayer);
        }else {
            acc.push({
                tName: currentPlayer.tName,
                players: [currentPlayer]
            });
        }
        return acc;
      },[])

      console.log('all_playersList_teams', all_playersList_teams.value)

       // 依以排入的選手排列
      unscheduledPlayerList.value =  all_playersList.value.filter(player=>player.attend ==0)
      console.log('unscheduledPlayer', unscheduledPlayerList.value )

        // 所有球隊資料
  all_playersList.value.forEach(player => {
    if (!teamsList.value.includes(player.tName) ) {
      teamsList.value.push(player.tName);
      show_team.value.push(player.tName)
    }})

    console.log('show_team.value', show_team.value)

		}else {
       console.log('決賽錯誤，RQB', requestBody)
      console.log('決賽錯誤，RQB', data)
    }

	} catch (error) {

		console.error("Error fetching data:", error);
	}
};
// 查看待排入的選手(預賽)
const  SelSessionsPlayerList= async () => {
  const requestBody = {
					tid: tid,
          cid: now_cid,

          // 測試
          sid: GameInfo.sid,
          // 測試
          roundID: GameInfo.roundID,

		};
    console.log('roundIDroundIDroundIDroundID', requestBody)
    // return
	try {
		const response = await fetch(
			`https://api.antqtech.com/Woodball_Test/Competition/SelSessionsPlayerList`,
			{
				method: "POST",
				 headers: {
					"Content-Type": "application/json",
          Authorization: userToken,
				},
        body: JSON.stringify(requestBody),
      }
		);
		const data = await response.json();

		if (response.status === 200) {
      
			console.log('成功查詢 SelSessionsPlayerList (測試)：', data[0].data1 )
      all_playersList.value = data[0].data1  //所有選手資料

      all_playersList_teams.value = all_playersList.value.reduce((acc, currentPlayer) =>{

        const existingTeam = acc.find(item=> item.tName === currentPlayer.tName);
        if(existingTeam) {
          existingTeam.players.push(currentPlayer);
        }else {
            acc.push({
                tName: currentPlayer.tName,
                players: [currentPlayer]
            });
        }
        return acc;
      },[])

      console.log('all_playersList_teams', all_playersList_teams.value)

       // 依以排入的選手排列
      unscheduledPlayerList.value =  all_playersList.value.filter(player=>player.attendMark ==0)
      console.log('unscheduledPlayer', unscheduledPlayerList.value )

        // 所有球隊資料
  all_playersList.value.forEach(player => {
    if (!teamsList.value.includes(player.tName) ) {
      teamsList.value.push(player.tName);
      show_team.value.push(player.tName)
    }})

    console.log('show_team.value', show_team.value)

		}else {
      console.log('預賽錯誤，RQB', requestBody)
      console.log('預賽錯誤，DATA', data)
    }

	} catch (error) {

		console.error("Error fetching data:", error);
	}
};




</script>

<style scoped>
/* input[type=radio] {
  color: #DDDDDD !important,
} */
</style>