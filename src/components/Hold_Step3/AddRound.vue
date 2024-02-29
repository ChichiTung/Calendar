<template>
  <transition>

    
    <div v-show="open"
  class="w-screen h-[100vh] bg-white_wb  p-[20px] pb-[0px]
  fixed top-[0vh] left-[50vw] translate-x-[-50%] " style="z-index: 800;">

  <!-- left section -->
  <div class="w-[calc(100vw-340px)] h-[100vh] ">
  


  <!-- 標題列 -->
  <div class ="flex justify-between h-[44px] mb-[30px] leading-[44px] items-center ">
    <div class="flex">
    <p v-if='isNewRound' class="text-[20px] leading-[44px] mr-[20px]">新增場次</p>
    <p v-else class="text-[20px] leading-[44px] mr-[20px]">編輯場次</p>
            


    <!-- 選時間 -->
    <div class="flex gap-[10px]">
        <!-- 日期 -->
          <div class="relative">
      <div
        class="w-[150px] h-[40px] bg-gray_l leading-[40px] px-[10px]  text-[16px] font-semibold rounded-[4px] text-start  text-gray_d border-[1px] border-solid border-gray_m
           " >
          {{ chosenDate.popupDate }}
          <img src="../../../assets/images/admin/calendar.png" class="w-[23px] absolute top-[11px] left-[120px]">
          </div>
          </div>
          <!-- <VueDatePicker v-model="time" time-picker /> -->
        <!--選開始時間  -->
        <div class="relative w-[150px] " id="timePicker">
          <div class="w-[20px] h-[20px] bg-white_wb absolute top-[10px] left-[10px] " style="z-index: 800;"></div>
          <!-- <VueDatePicker v-model="seStart" select-text="確定" cancel-text="取消" time-picker /> -->
          <div class="w-[20px] h-[20px] bg-white_wb  absolute top-[10px] left-[120px]" style="z-index: 800;">
             <img src="../../../assets/images/admin/time.png" class="w-[23px] ">
          </div>
          <!-- timePicked -->
          <!-- <p v-if="GameInfo.seStart ==  $ScheduleStore.timePicked || seStart =='' "
          class="absolute top-[-3px] left-[58px]  pointer-events-none
          font-[600]" style="z-index: 300;">{{ $ScheduleStore.timePicked }}</p> -->
          <div v-if="seStart==''"
          class="w-[60px] bg-white h-[30px] absolute top-[3px] left-[40px] flex items-center font-bold pl-[10px] pointer-events-none">
            <p>{{ GameInfo.seStart }}</p>
          </div>

        </div>
        <!-- <v-date-picker mode="time" v-model="date" :timezone="timezone" /> -->

          <p>~</p>

        <!--選結束時間  -->
           <div class="relative">
              <input  disabled v-model="seEnd"    type="text" 
                class="w-[150px] h-[40px] bg-white_wb p-[10px] text-[16px] font-semibold rounded-[4px] text-center
          placeholder:text-gray_d border-[1px] border-solid border-gray_m
          text-black_m disabled:bg-white_wb translate-y-[-1px] " >
                  <img src="../../../assets/images/admin/time.png" class="w-[20px] absolute top-[11px] left-[120px]">

                  <div class="w-[80px] h-[30px] bg-white absolute top-[3px] left-[20px]" v-if=" GameInfo.defState==0 " style="z-index: 500;"></div>

                  <div v-if="GameInfo.seEnd.length==5  "    class="w-[60px] bg-white h-[30px] absolute top-[3px] left-[40px] flex items-center font-bold pl-[10px]">
                      <p>{{ GameInfo.seEnd }}</p>
                  </div>
            </div>
               

      </div>
    </div>
    <div class="flex gap-[20px] text-[16px]">
    <button @click="closePopup" class="w-[81px] h-[40px] bg-white_wb border-[1px] border-solid border-gray_m text-center text-gray_m rounded-[50px] tracking-wider">取消</button>
    <button v-if="!isNewRound"
    @click="toggle_deletePopup()" class="w-[115px] h-[40px] bg-white_wb border-[1px] border-solid border-gray_m text-center text-gray_m rounded-[50px]">刪除賽程</button>
     <button @click="saveAll()" 
     :disabled="GameInfo.sid == 0 || GameInfo.seStart =='' || GameInfo.roundID== 0 || GameInfo.defState ==0"
     class="w-[115px] h-[40px] bg-green_m text-center text-white_wb rounded-[50px]  disabled:bg-gray_m disabled:text-gray_l tracking-wider">
      儲存編輯</button>
     </div>
  </div>

  <!-- 場次賽制 -->
      <div class="w-full flex text-green_m pb-[28px]  text-[14px] font-semibold">

        <!-- 場次 -->
        <div class="   h-[40px]  items-center w-[263px] mr-[30px] flex">
          <label class="mr-[6px] leading-[40px] flex-shrink-0 w-auto">場次賽制</label>
            <select :disabled="($ScheduleStore.existPlayers.length>0 && isNewRound) || !isNewRound"
            v-model="GameInfo.sid"
										class="bg-white w-[200px] h-[44px]  border-[1px] border-solid border-[#999] rounded-[4px] text-start   font-medium text-[16px]  pr-[50px] pl-3  text-black_m
                    hover:outline-none hover:border-black_m hover:ring-0
                    focus:outline-none focus:border-black_m focus:ring-0
                    disabled:bg-gray_l disabled:text-gray_d"
                    :class="{'text-gray_m':GameInfo.sid==0}"
										>
											<option	v-for="(option, index) in  sidArray"
						          :key="option"			:value="option"
						          style="padding-bottom: 20px; font-weight: 200;"	>
						              {{ comSid[option] }}
					            </option>
				</select>
        </div>

        <!-- 輪數 -->
         <div class="   h-[40px]  items-center w-[290px] flex">
          <label class="mr-[6px] leading-[40px] flex-shrink-0 w-auto">輪數 </label>
            <select v-model="GameInfo.roundID"
              :disabled="((GameInfo.sid==0 || $ScheduleStore.existPlayers.length>0) && isNewRound) || !isNewRound"
										class="bg-white w-[150px] h-[44px]  border-[1px] border-solid border-[#999] rounded-[4px] text-start   font-medium text-[16px]  pr-[50px] pl-3 text-black_m
                    hover:outline-none hover:border-black_m hover:ring-0
                    focus:outline-none focus:border-black_m focus:ring-0
                    disabled:bg-gray_l disabled:text-gray_d"
                      :class="{'text-gray_m':GameInfo.roundID==0}"
										>
											<option	v-if="GameInfo.sid==1"
                      v-for="(option, index) in  single_roundArray"
						          :key="option"			:value="option.roundNum"
						          style="padding-bottom: 20px; font-weight: 200;"	>
						              {{ comRound[option.roundNum] }}
					            </option>
                      <option	v-if="GameInfo.sid==2"
                      v-for="(option, index) in  double_roundArray"
						          :key="option"			:value="option.roundNum"
						          style="padding-bottom: 20px; font-weight: 200;"	>
						              {{ comRound[option.roundNum] }}
					            </option>
                      <option	v-if="GameInfo.sid==4"
                      v-for="(option, index) in  single_roundArray"
						          :key="option"			:value="option.roundNum"
						          style="padding-bottom: 20px; font-weight: 200;"	>
						              {{ comRound[option.roundNum] }}
					            </option>
				    </select>

            <!-- !!加回來 -->
            <!-- <p class="text-black_m leading-[44px] ml-[6px] font-[400]">( 第 2 場次 )</p> -->

        </div>

      </div>

      <!-- 場次名稱 -->
      <div  v-if="GameInfo.roundID!==0 "
      class="w-full  text-green_m pb-[28px]  text-[14px] font-semibold ">
         <div class="h-[40px]  items-center w-full flex relative">
          <label class="mr-[6px] leading-[40px] flex-shrink-0 w-auto">場次名稱</label>
            <input v-model="GameInfo.seName"  type="text" placeholder="輸入場次名稱"  
        class="w-full h-[44px]  bg-[#FFF]  rounded-[4px]
        border-[1px] border-solid border-[#999]  text-black_m text-start  placeholder:font-medium   placeholder:text-gray_m
        font-normal 
        focus:outline-none focus:border-[#999]  focus:ring-[#999]  focus:ring-none
        hover:outline-none hover:border-black_m hover:ring-0        " 
       >

       <p v-if="GameInfo.seName==''"
       class="text-black_m text-start  absolute top-[8px] left-[76px] text-[16px] bg-white pointer-events-none"> {{default_seName}}</p>
      

        </div>
      </div>

      <p class="mb-[20px] text-gray_m tracking-wide" v-if="(GameInfo.sid==0 || GameInfo.roundID==0) && isNewRound">請在選擇賽制與輪數後開始安排選手</p>

      <!-- 開始方式 -->
      <div v-else class="flex justify-between">
      <div class="w-[286px]  flex mb-[20px] ">
                      <!-- 同時開始競賽 -->
					            <div class="relative w-1/2  flex">
					<!-- v-model="teamMember.dietary" -->
                        <input 
                        :disabled="$ScheduleStore.existPlayers.length>0 || !isNewRound"
                        id="chosenStartState_1"
                        v-model="GameInfo.defState "
                          value='2' type="radio" class="w-[22px] h-[22px] mr-[8px]   outline-none border-white border-none  bg-[#d9d9d9]  translate-y-[40%]   relative focus:outline-none focus:border-none  disabled:bg-[#d9d9d9]" style="display: block;  background-size: 150% 150%; color: #d9d9d9;">
                          <div v-if="GameInfo.defState==2"
                          class=" w-[13px] h-[13px] rounded-full     absolute translate-x-[35%] translate-y-[100%] bg-gray_d
                          "    ></div>

                                <label for="chosenStartState_1" class="inline leading-[44px] flex-shrink-0">同時開始競賽</label>
       		            </div>
                      <!-- 從第一道開始 -->
                      <div class="relative w-1/2  flex">
					            <!-- v-model="teamMember.dietary" -->
                        <input  
                         :disabled="$ScheduleStore.existPlayers.length>0  || !isNewRound"
                        id="chosenStartState_2"
                        v-model="GameInfo.defState"
                          value='1' type="radio" class="w-[22px] h-[22px] mr-[8px]   outline-none border-white border-none  bg-[#d9d9d9]  translate-y-[40%]   relative focus:outline-none  
                          disabled:bg-[#d9d9d9]  " style="display: block;  background-size: 150% 150%;color: #d9d9d9; ">
                          <div  v-if="GameInfo.defState==1"
                          class=" w-[13px] h-[13px] rounded-full     absolute translate-x-[35%] translate-y-[100%] bg-gray_d"    ></div>
                                <label for="chosenStartState_2" class="inline leading-[44px] flex-shrink-0">從第一道開始</label>
       		            </div>
			</div>
      <p>尚有 {{ 5*$ScheduleStore.temp_playersInSessions.length - $ScheduleStore.existPlayers.length - $ScheduleStore.originPlayersCount  }} 個空位</p>
      </div>


      <!-- data -->
        

      <!-- 第一道開始表頭 -->
    <div v-if="GameInfo.defState==1"
    class="w-full bg-white h-[41px] px-[10px] flex gap-[10px] text-gray_d text-[14px] font-semibold mb-[20px] rounded-[4px] shadow-lg"
    :class="{'text-gray_lightest':GameInfo.sid==0 || GameInfo.roundID==0}">
      <div class="w-[120px] p-[10px] text-start flex-shrink-0">
        開始時間
      </div>
     <div class="w-full p-[10px] text-start ">
        選手 1
      </div>
      <div class="w-full p-[10px] text-start ">
        選手 2
      </div>
      <div class="w-full p-[10px] text-start ">
        選手 3
      </div>
      <div class="w-full p-[10px] text-start ">
        選手 4
      </div>
      <div class="w-full p-[10px] text-start ">
        選手 5
      </div>
      <div class="w-[50px] p-[10px] text-start flex-shrink-0">
        刪除
      </div>
    </div>

    <!-- 同時開始表頭 -->
    <div v-else
     class="w-full bg-white h-[41px] px-[10px] flex gap-[10px] text-gray_d text-[14px] font-semibold mb-[20px] rounded-[4px] shadow-lg"
    :class="{'text-gray_lightest':GameInfo.sid==0 || GameInfo.roundID==0}">
      <div class="w-[50px] p-[10px] text-start flex-shrink-0">
        道次
      </div>
     <div class="w-full p-[10px] text-start ">
        選手 1
      </div>
      <div class="w-full p-[10px] text-start ">
        選手 2
      </div>
      <div class="w-full p-[10px] text-start ">
        選手 3
      </div>
      <div class="w-full p-[10px] text-start ">
        選手 4
      </div>
      <div class="w-full p-[10px] text-start ">
        選手 5
      </div>
    </div>

    <SameTime :open="showTable"  :chosenStartState="chosenStartState"
    :addAllPlayers="addAll"
    :addSelectedPlayers="addSelected"></SameTime>

    <Fairway :open="showTable" :chosenStartState="chosenStartState"></Fairway>
  </div>

  <Right :chosenSid="chosenSid" :chosenRound="chosenRound"
   :all_playersList="all_playersList" 
   :all_playersList_teams="all_playersList_teams"
   :unscheduledPlayerList="unscheduledPlayerList"
  @addAllPlayers="toggle_addAllPlayers"
  @addSelectedPlayers="toggle_addSelectedPlayers"
  ></Right>

  <Delete :open="deletePopup" @close="toggle_deletePopup" @delete="DelSessions()"></Delete>
    
  </div>

  <!-- 確認刪除 POPUP -->
  <!-- backdrop-blur-[1px] -->
  
  
</transition>



</template>

<script setup>
// import VueDatePicker from '@vuepic/vue-datepicker';
// import '@vuepic/vue-datepicker/dist/main.css'


import {
	ref,
	onMounted,
	onUnmounted,
	reactive,
	computed,
	watch,
	nextTick,
} from "vue";

import { DateTime } from 'luxon';

import { useScheduleStore } from "../../stores/schedule";
const $ScheduleStore = useScheduleStore();
import { useFormStore } from "../../stores/form";
const $store = useFormStore();
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();

const GameInfo =$ScheduleStore.nowGameInfo






const emits = defineEmits()


const { open, data, chosenDate, tid, chosenFid, timePicked, isNewRound, all_playersList ,all_playersList_teams ,unscheduledPlayerList } = defineProps(['open', 'data', 'chosenDate', 'tid',  'chosenFid' , 'timePicked', 'isNewRound', 'all_playersList', 'all_playersList_teams','unscheduledPlayerList' ]);

const closePopup = async() => {
  await $ScheduleStore.RESET()

  GameInfo.seName=''
  $ScheduleStore.chosenPlayersArray =[]
  $ScheduleStore.existPlayers =[]
  $ScheduleStore.temp_changePlayer_row =-1
  $ScheduleStore.temp_changePlayer_sort =-1
  seStart.value =''
  seEnd.value =''
  chosenSid.value =0
  chosenStartState.value =2
  chosenRound.value =0

  GameInfo.seEnd =''
  // GameInfo.sid=0
  // GameInfo.sid=0



  emits('close');
};



// 開始時間
const seStart= ref('');


// 結束時間
const seEnd = ref();
// 從插件選時間的狀況
const calc_seEnd =() =>{
  const { hours, minutes } = seStart.value;
  const temp= DateTime.local().set({ hours, minutes }).plus({ minutes: 80 });
  seEnd.value = temp.toFormat('HH:mm')
}
// 原本seStar 就有值
const calc_seEnd_withSeStart =() =>{
 const [startHours, startMinutes] = seStart.value.split(':').map(Number);

  const temp = DateTime.local().set({ hours: startHours, minutes: startMinutes }).plus({ minutes: 80 });

  seEnd.value = temp.toFormat('HH:mm')
}

watch(seStart, (newVal, oldVal)=>{
  console.log('newValnewValnewValnewValnewVal', newVal)
  if(newVal.length!=5){
    console.log('nownonwonownownonwonwo', seStart.value)
    calc_seEnd()
  }else {
    console.log('yiyiyiyiyi')
    calc_seEnd_withSeStart()
  }
})
watch(isNewRound, (newVal)=>{
    if(newVal !=true){
      seStart.value = $ScheduleStore.timePicked
      console.log('hohohohohohoho')
     calc_seEnd()
  }
})


// 儲存編輯
const saveAll =  () => {
  UpdSessions();

  // emits('close');
  // window.location.reload();
}


// 刪除
const deletePopup=ref(false)
const toggle_deletePopup=()=>{
  deletePopup.value=!deletePopup.value
}


    // 賽制與組別
    const sidArray = ref([0,1,2,4])
    const chosenSid = ref(0)
  onMounted(() => {
    $ScheduleStore. temp_changePlayer_row = -1;
    $ScheduleStore. temp_changePlayer_sort = -1;
    
    $ScheduleStore.RESET()

    // 回傳有的賽制
    SelRoundMenu()

console.log('sidArray', sidArray.value)


  })
  
 const comSid= {
  '0': '選擇賽制',
  '1': '個人桿數賽',
  '2': '雙人桿數賽',
  '3': '個人球道賽',
  '4': '個人+團體桿數賽',
}


// 輪數
const chosenRound = ref(0)
  const single_roundArray = ref([])
  const double_roundArray = ref([])
  const fairway_roundArray = ref([])
  const comRound= {
  '0': '選擇輪數',
  '101': '預賽第 1 輪',
  '102': '預賽第 2 輪',
  '103': '預賽第 3 輪',
  '104': '預賽第 4 輪',
  '201': '複賽第 1 輪',
  '202': '複賽第 2 輪',
  '203': '複賽第 3 輪',
  '204': '複賽第 4 輪',
  '301': '決賽第 1 輪',
  '302': '決賽第 2 輪',
  '303': '決賽第 3 輪',
  '304': '決賽第 4 輪',

}
watch(chosenRound,(newVal)=>{
if(newVal!==0) {
  calc_seEnd()
}
})


// 場次名稱
// 個人桿數賽·預賽第 1 輪·第 2 場次 
const default_seName= computed(()=>{
  return comSid[GameInfo.sid] + '．' +  comRound[GameInfo.roundID] ;
})


// 開始狀態
const chosenStartState=ref(2)






// 顯示 table
const showTable = ref(true)
// watch(chosenRound,(newVal) =>{
// if(newVal!==0) {
//   showTable.value = true
// }else {
//   showTable.value = false
// }
// })

// 一鍵排入
const addAll=ref(false)
const addSelected=ref(false)
const toggle_addAllPlayers =()=>{
addAll.value=!addAll.value
console.log('toggle_addAllPlayers', addAll.value)

}
const toggle_addSelectedPlayers =()=>{
addSelected.value=!addSelected.value
console.log('toggle_addSelectedPlayers', addSelected.value)
}

// Api

// userToken
  const userToken_localStorage = JSON.parse(localStorage.getItem("userToken"))
  const userToken =userToken_localStorage.userToken

// 修改賽程基本資料
const UpdSessions= async () => {

  if(seStart.value !==''){
     const seStart_api = `${seStart.value.hours < 10 ? '0' + seStart.value.hours : seStart.value.hours}:${seStart.value.minutes < 10 ? '0' + seStart.value.minutes : seStart.value.minutes}`;
     GameInfo.seStart = seStart_api
     GameInfo.seEnd = seEnd.value
  }

  if(GameInfo.seName==''){
    GameInfo.seName = default_seName
  }

  const requestBody = {
					tid: tid,
          cid: route.params.cid,
          seid: GameInfo.seid, // 0是新增 
          seName: GameInfo.seName,

          // seDate: '2024-02-10',
          seDate: $ScheduleStore.chosenDate,
          

          // seStart: seStart_api,
          seStart: GameInfo.seStart,

          // seEnd: seEnd.value,
          seEnd: GameInfo.seEnd,
          // !! 測試
          fid: $ScheduleStore.chosenFid,
          defState: GameInfo.defState,
          sid: GameInfo.sid,
          roundID: GameInfo.roundID,
		};
    console.log(requestBody)
    // return

	try {
		const response = await fetch(
			`https://api.antqtech.com/Woodball_Test/Competition/UpdSessions`,
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



		if (response.status === 200  ) {
    console.log('大成功啊啊啊啊啊啊', data[0].msg)

    if(data[0].msg!='修改場次成功~'){
      $ScheduleStore.nowGameInfo.seid = data[0].msg
    }
   
    // 執行更新選手名單
    UpdSessionsList();


    }else{
      console.log('GGGGGGGGGGGGGGGGGGGGGGGGGG', data)
      if(data.status==400) {
    alert(data.title)

      }

    console.log('requestBody',requestBody)

    alert(data[0].msg)
    }

	} catch (error) {

		console.error("Error fetching data:", error);
	}
};

// 查詢賽制輪數編號
const SelRoundMenu = async() =>{
  const requestBody = {
    tid: tid,
    cid: route.params.cid,
    // sid: 1,
  }

  console.log('SelRoundMenu 的：',requestBody)

	try {
		const response = await fetch(
			`https://api.antqtech.com/Woodball_Test/Competition/SelRoundMenu`,
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
      
		console.log('成功查詢 SelRoundMenu', data)

    single_roundArray.value = data.data1.filter(item=>item.sid==1)

    double_roundArray.value = data.data1.filter(item=>item.sid==2)

    // fairway_roundArray_roundArray.value = data.data1.filter(item=>item.sid==3)

    console.log('single_roundArray', single_roundArray.value)


    }else{
		console.log('查詢不到 SelRoundMenu', data)

    }

	} catch (error) {

		console.error("Error fetching data:", error);
	}


}

// 修改賽程名單
const UpdSessionsList = async () => {

   const seStart_api = `${seStart.value.hours < 10 ? '0' + seStart.value.hours : seStart.value.hours}:${seStart.value.minutes < 10 ? '0' + seStart.value.minutes : seStart.value.minutes}`;

   console.log($ScheduleStore.temp_playersInSessions)

 

   

 const filteredSessions = $ScheduleStore.temp_playersInSessions.map((session,sessionID) => {
    const filteredRowPlayers = session.rowPlayers.filter(player => Object.keys(player).length !== 0);

    return filteredRowPlayers.map((player, playerID) => ({
      // classID:  $ScheduleStore.temp_playersInSessions.indexOf(session),
      classID:  sessionID+1,
      
      sTime:   session.sTime==undefined ?seStart_api:session.sTime  , //時間要都是兩位數
      // sTime: seStart_api,
      sSort: session.rowPlayers.indexOf(player)+1,
      playerID1: player.playerID1,
      playerID2: player.playerID2,
      preGID: 0, //預賽須填0
      preRanking:0, //預賽須填0
      
    }));
  }).filter(session => session.length > 0);


  const playerList = filteredSessions.map(session => session.map(player => ({
    ...player,
    // preGID: 1, // 預設值
    // preRanking: 1 // 預設值
  }))).flat();

  const requestBody = {
					tid: tid,
          cid: route.params.cid,
          seid: $ScheduleStore.nowGameInfo.seid, // 0是新增 測試資料 
         playerList: playerList,
		};
    console.log(requestBody)
    // return

	try {
		const response = await fetch(
			`https://api.antqtech.com/Woodball_Test/Competition/UpdSessionsList`,
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
    console.log('終於大成功啊啊啊啊啊啊')
    emits('close')
    window.location.reload()

    }else{
    alert(data[0].msg)

      console.log(data)
    }

	} catch (error) {

		console.error("Error fetching data:", error);
	}
};

// 刪除賽程
// 查詢賽制輪數編號
const DelSessions = async() =>{
  toggle_deletePopup()
  $ScheduleStore.temp_playersInSessions = []
  UpdSessionsList()

  
  const requestBody = {
    tid: tid,
    cid: route.params.cid,
    seid: $ScheduleStore.nowGameInfo.seid,
  }

  console.log('DelSessions 的：',requestBody)

  // return
	try {
		const response = await fetch(
			`https://api.antqtech.com/Woodball_Test/Competition/DelSessions`,
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
      
		console.log('成功刪除賽程')
    console.log(data)
    window.location.reload()
 
    

    }else{
		console.log('無法刪除OAQ', data)

    }

	} catch (error) {

		console.error("Error fetching data:", error);
	}


}

</script>

<style scoped>



/* scrollbar */
::-webkit-scrollbar {
-webkit-appearance: none;
width: 4px; 
height: 0.4em;
}


::-webkit-scrollbar-track {
background: rgba(0, 0, 0, 0.2); 
/* background: #000; */
border-radius: 0;

}


::-webkit-scrollbar-thumb {
cursor: pointer; 
border-radius: 5px;
/* background: rgba(0, 0, 0, 0.15);  */
background: #666;
transition: color 0.2s ease;
 border-radius: 4px;
 -webkit-border-radius:2em;
 -mox-border-radius:2em;

      /* border: 1px solid slategrey; */

}

 /* transition */
  .v-enter-from {
    top: 15vh;
    opacity: 0.8;
  }
  
 .v-enter-active{
  transition: 0.5s;
}
.v-leave-from,
.v-enter-to{
    top: 0vh;
     opacity: 1;
}


.v-leave-active{
  transition: 0.2s;
}
 .v-leave-to {
 top: 20vh;
 opacity: 0.2;
}

</style>

<style>
/* time-picker */
#timePicker .dp__main .dp__input {
  height: 40px;
  font-size: 17px;
  transform: translateY(-3px);
  border-color: #999;
  color: #222222;
  font-weight: 600;
  letter-spacing: 1px;
}

#timePicker  .dp__action_select{
  background-color: #008D6E;
  height: 30px;
  width: 60px;
  border-radius: 50px;
}
#timePicker  .dp__action_cancel{
  border: 1px solid #999999;
  height: 30px;
  width: 60px;
  border-radius: 50px;
  transform: translateX(-10px);
}

</style>

