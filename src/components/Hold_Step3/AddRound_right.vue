<template>
  
  <div class="w-[300px] h-[100vh] fixed top-0  border-l-[1px] border-gray_l right-0 py-[20px]  "  style="z-index: -1;">
    

      <!-- title -->
      <h3 class="w-full text-black_m text-[16px] mb-[20px leading-[24px] px-[20px] " :class="{'text-gray_m':GameInfo.sid==0 || GameInfo.roundID==0}">選手列表</h3>
      
      <p v-if="GameInfo.sid!==0 && GameInfo.roundID!==0 " class="px-[20px] ">(還有 <span class="font-[600]"> {{ unscheduledPlayerList.length - $ScheduleStore.existPlayers.length < 0 ? 0 : unscheduledPlayerList.length - $ScheduleStore.existPlayers.length }}</span> 人未排入，共 {{ all_playersList.length}} 人)</p>

      <!-- 所有組別 -->
      <div class="relative my-[20px] mx-[20px]" style="z-index: -1;">
         <img v-if="GameInfo.sid!==0 && GameInfo.roundID!==0" src="../../../assets/images/filter_filled.png " class="absolute top-[12px] left-[15px] w-[18px] h-[18px]">
       <select :disabled="GameInfo.sid==0 || GameInfo.roundID==0"
                    v-model="teamFiltered"
										class="bg-white w-[260px] h-[44px] mr-[20px] border-[1px] border-solid border-[#999] rounded-[4px] text-start   font-medium text-[16px] pr-[50px]  pl-[40px]  disabled:bg-gray_l disabled:text-gray_l
                    hover:outline-none hover:border-black_m hover:ring-0
                    focus:outline-none focus:border-black_m focus:ring-0"
										>
											<option	v-for="(option, index) in  teamArray"
						          :key="option"			:value="option.gName"
						          style="padding-bottom: 20px; font-weight: 200;" class="h-auto"	>
						              {{ option.gName }}
					            </option>
				</select>
      </div>

      <!-- 球隊 區塊 -->
      <div class="  h-[72%] mb-[20px] overflow-y-auto overflow-x-hidden  " >

        <!-- 未安排  -->
        <div v-if="GameInfo.sid==0 || GameInfo.roundID==0"
        class="w-full h-[44px] p-[10px] flex flex-col  mb-[10px] relative">
        <div class="flex justify-between  mb-[20px] relative px-[20px]">
          
          <!-- 球隊名 -->
          <p class="translate-x-[-10px] text-gray_m">球隊</p>
          <button class="translate-x-[0px]"
          @click="toggle_showTeam(team.gName)" >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 9L12 15L19 9" stroke="#999999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
         </div>
         
         <!-- 分割線 -->
         <div class="border-b-[1px] border-gray_l w-[300px] h-[2px] fixed top-[170px] translate-x-[-10px]" style="z-index: 500;"></div>

         <!-- 假框框 -->
          <div  class="flex flex-wrap gap-[10px] ml-[10px]">
             <div class="w-[120px] h-[65px] rounded-[4px] bg-gray_lightest p-[10px] mb-[10px] relative"></div>
             <div class="w-[120px] h-[65px] rounded-[4px] bg-gray_lightest p-[10px] mb-[10px] relative"></div>
             <div class="w-[120px] h-[65px] rounded-[4px] bg-gray_lightest p-[10px] mb-[10px] relative"></div>
             <div class="w-[120px] h-[65px] rounded-[4px] bg-gray_lightest p-[10px] mb-[10px] relative"></div>
             <div class="w-[120px] h-[65px] rounded-[4px] bg-gray_lightest p-[10px] mb-[10px] relative"></div>
             <div class="w-[120px] h-[65px] rounded-[4px] bg-gray_lightest p-[10px] mb-[10px] relative"></div>
             <div class="w-[120px] h-[65px] rounded-[4px] bg-gray_lightest p-[10px] mb-[10px] relative"></div>
             <div class="w-[120px] h-[65px] rounded-[4px] bg-gray_lightest p-[10px] mb-[10px] relative"></div>

          </div>
          
          
        </div>

        <!-- 開始安排(篩選報名組別) -->
        <div v-else-if="teamFiltered!=='所有組別'"
        v-for="(team, teamID) in filtered_playersList_teams" >
        
        <!-- 只有預賽有(?) -->
        <div v-if="GameInfo.roundID<200"
        class="w-full h-[44px] p-[10px] flex justify-between  mb-[10px] relative px-[20px]" >

          <!-- 分隔線 -->
          <div class="border-b-[1px] border-gray_l w-[300px] h-[2px] absolute top-[40px] translate-x-[-30px]"></div>
          
          <p class="translate-x-[-10px]" >{{ team.tName }}</p>
          
          <!-- 展開按鈕 -->
          <button class=""
          @click="toggle_showTeam(team.tName)" >
           <img src="../../../assets/images/admin/drop.png" class="w-[20px] h-[10px] cursor-pointer rotate-180 "
           :class="{'rotate-[-180]': !show_team.includes(team.tName)}">
          </button>

        </div>

        
        <!-- 球員 -->
        <div v-if="!show_team.includes(team.tName)"
        class="flex flex-wrap gap-[10px] px-[20px]">
          <div  v-for="(player, playerID) in team.players">

          <button :disabled="player.attendMark==1"
          @click="addChosenPlayers(player, playerID, teamID)"
          class="w-[122px] h-[65px] rounded-[4px] bg-gray_lightest  p-[10px] mb-[10px] relative 
          disabled:bg-gray_d disabled:text-red-800
          flex-col items-start"
          :class="{' border-[#12AFCE] border-[1px]':$ScheduleStore.chosenPlayersArray.includes(player), 'h-[80px]  justify-start':GameInfo.roundID>200}"
          :style="{
        backgroundColor: $ScheduleStore.chosenPlayersArray.includes(player) ? '#E2FAFF' :
                         ($ScheduleStore.existPlayers.includes(player.playerID1) || player.attendMark==1 ? '#999999' : '#efefef')
     }">
  
     <!--  -->
            <!-- 組別 -->
            <p class="text-[14px] leading-[21px] text-blue_d font-[600]"
            :class="{'text-gray_l':$ScheduleStore.existPlayers.includes(player.playerID1) || player.attendMark==1}"
             >{{ player.gName }}</p>

    <p v-if="GameInfo.roundID>200 && GameInfo.roundID<300" class="text-[14px]"> 預賽第 {{ player.preRanking }} 名</p>
    <p v-if="GameInfo.roundID>300 " class="text-[14px]"> 複賽第 {{ player.preRanking }} 名</p>

            <p   :class="{'text-gray_l':$ScheduleStore.existPlayers.includes(player.playerID1)|| player.attendMark==1 }">{{ player.pName1 }}</p>
            <!-- 備註 -->
            <div  v-if="player.cNote && player.cNote!=''"
            class="w-[22px] h-[21px] rounded-tr-[4px] rounded-bl-[4px] absolute top-0 right-0 bg-gray_l"
              :style="{ backgroundColor: $ScheduleStore.chosenPlayersArray.includes(player) ? '#12AFCE' :
                         ($ScheduleStore.existPlayers.includes(player.playerID1) || player.attendMark==1? '#666666' : '#DDD')}"
             >
              <!-- 備註本人 -->
              <div @mouseenter="toggle_showHover(-1,-1-1)"
              v-if="showHover==1 && showHover_ID===playerID && showHover_teamID==teamID" 
              class="w-[200px] h-[62px] rounded-[4px] p-[10px] absolute top-[-70px] right-0 bg-gray_l text-[14px] leading-[21px] shadow-lg" style="z-index: 800;"
            
              >
              <p>{{ player.cNote }}</p>
            </div>
              <div @mouseenter="toggle_showHover(teamID,playerID,1)" @mouseleave="toggle_showHover(-1,-1-1)"
              class="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">

              <svg v-if="$ScheduleStore.chosenPlayersArray.includes(player)"
                width="4" height="12" viewBox="0 0 4 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.356 7.458L1.006 2.488L0.95 0.528H3.05L2.994 2.488L2.644 7.458H1.356ZM2 11.112C1.67333 11.112 1.398 11.0047 1.174 10.79C0.959334 10.5753 0.852 10.3 0.852 9.964C0.852 9.61867 0.964 9.34333 1.188 9.138C1.412 8.92333 1.68267 8.816 2 8.816C2.31733 8.816 2.588 8.92333 2.812 9.138C3.036 9.34333 3.148 9.61867 3.148 9.964C3.148 10.3 3.036 10.5753 2.812 10.79C2.588 11.0047 2.31733 11.112 2 11.112Z" fill="#FFFFFF"/></svg>

                <svg v-else
                width="4" height="12" viewBox="0 0 4 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.356 7.458L1.006 2.488L0.95 0.528H3.05L2.994 2.488L2.644 7.458H1.356ZM2 11.112C1.67333 11.112 1.398 11.0047 1.174 10.79C0.959334 10.5753 0.852 10.3 0.852 9.964C0.852 9.61867 0.964 9.34333 1.188 9.138C1.412 8.92333 1.68267 8.816 2 8.816C2.31733 8.816 2.588 8.92333 2.812 9.138C3.036 9.34333 3.148 9.61867 3.148 9.964C3.148 10.3 3.036 10.5753 2.812 10.79C2.588 11.0047 2.31733 11.112 2 11.112Z" fill="#999999"/></svg>

              </div>
                
            </div>
          </button>
          
        </div>
        </div>
        </div>
        

        <!-- 開始安排(所有組別) -->
        <div v-else
        v-for="(team, teamID) in all_playersList_teams" >
        
        <!-- 只有預賽有(?) -->
        <div v-if="GameInfo.roundID<200"
        class="w-full h-[44px] p-[10px] flex justify-between  mb-[10px] relative px-[20px]" >

          <!-- 分隔線 -->
          <div class="border-b-[1px] border-gray_l w-[300px] h-[2px] absolute top-[40px] translate-x-[-30px]"></div>
          
          <p class="translate-x-[-10px]" >{{ team.tName }}</p>
          
          <!-- 展開按鈕 -->
          <button class=""
          @click="toggle_showTeam(team.tName)" >
           <img src="../../../assets/images/admin/drop.png" class="w-[20px] h-[10px] cursor-pointer rotate-180 "
           :class="{'rotate-[-180]': !show_team.includes(team.tName)}">
          </button>

        </div>

        
        <!-- 球員 -->
        <div v-if="!show_team.includes(team.tName)"
        class="flex flex-wrap gap-[10px] px-[20px]">
          <div  v-for="(player, playerID) in team.players">

          <button :disabled="player.attendMark==1"
          @click="addChosenPlayers(player, playerID, teamID)"
          class="w-[122px] h-[65px] rounded-[4px] bg-gray_lightest  p-[10px] mb-[10px] relative 
          disabled:bg-gray_d disabled:text-red-800
          flex-col items-start"
          :class="{' border-[#12AFCE] border-[1px]':$ScheduleStore.chosenPlayersArray.includes(player), 'h-[80px]  justify-start':GameInfo.roundID>200}"
          :style="{
        backgroundColor: $ScheduleStore.chosenPlayersArray.includes(player) ? '#E2FAFF' :
                         ($ScheduleStore.existPlayers.includes(player.playerID1) || player.attendMark==1 ? '#999999' : '#efefef')
     }">
  
     <!--  -->
            <!-- 組別 -->
            <p class="text-[14px] leading-[21px] text-blue_d font-[600]"
            :class="{'text-gray_l':$ScheduleStore.existPlayers.includes(player.playerID1) || player.attendMark==1}"
             >{{ player.gName }}</p>

    <p v-if="GameInfo.roundID>200 && GameInfo.roundID<300" class="text-[14px]"> 預賽第 {{ player.preRanking }} 名</p>
    <p v-if="GameInfo.roundID>300 " class="text-[14px]"> 複賽第 {{ player.preRanking }} 名</p>

            <p   :class="{'text-gray_l':$ScheduleStore.existPlayers.includes(player.playerID1)|| player.attendMark==1 }">{{ player.pName1 }}</p>
            <!-- 備註 -->
            <div  v-if="player.cNote && player.cNote!=''"
            class="w-[22px] h-[21px] rounded-tr-[4px] rounded-bl-[4px] absolute top-0 right-0 bg-gray_l"
              :style="{ backgroundColor: $ScheduleStore.chosenPlayersArray.includes(player) ? '#12AFCE' :
                         ($ScheduleStore.existPlayers.includes(player.playerID1) || player.attendMark==1? '#666666' : '#DDD')}"
             >
              <!-- 備註本人 -->
              <div @mouseenter="toggle_showHover(-1,-1-1)"
              v-if="showHover==1 && showHover_ID===playerID && showHover_teamID==teamID" 
              class="w-[200px] h-[62px] rounded-[4px] p-[10px] absolute top-[-70px] right-0 bg-gray_l text-[14px] leading-[21px] shadow-lg" style="z-index: 800;"
            
              >
              <p>{{ player.cNote }}</p>
            </div>
              <div @mouseenter="toggle_showHover(teamID,playerID,1)" @mouseleave="toggle_showHover(-1,-1-1)"
              class="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">

              <svg v-if="$ScheduleStore.chosenPlayersArray.includes(player)"
                width="4" height="12" viewBox="0 0 4 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.356 7.458L1.006 2.488L0.95 0.528H3.05L2.994 2.488L2.644 7.458H1.356ZM2 11.112C1.67333 11.112 1.398 11.0047 1.174 10.79C0.959334 10.5753 0.852 10.3 0.852 9.964C0.852 9.61867 0.964 9.34333 1.188 9.138C1.412 8.92333 1.68267 8.816 2 8.816C2.31733 8.816 2.588 8.92333 2.812 9.138C3.036 9.34333 3.148 9.61867 3.148 9.964C3.148 10.3 3.036 10.5753 2.812 10.79C2.588 11.0047 2.31733 11.112 2 11.112Z" fill="#FFFFFF"/></svg>

                <svg v-else
                width="4" height="12" viewBox="0 0 4 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.356 7.458L1.006 2.488L0.95 0.528H3.05L2.994 2.488L2.644 7.458H1.356ZM2 11.112C1.67333 11.112 1.398 11.0047 1.174 10.79C0.959334 10.5753 0.852 10.3 0.852 9.964C0.852 9.61867 0.964 9.34333 1.188 9.138C1.412 8.92333 1.68267 8.816 2 8.816C2.31733 8.816 2.588 8.92333 2.812 9.138C3.036 9.34333 3.148 9.61867 3.148 9.964C3.148 10.3 3.036 10.5753 2.812 10.79C2.588 11.0047 2.31733 11.112 2 11.112Z" fill="#999999"/></svg>

              </div>
                
            </div>
          </button>
          
        </div>
        </div>
        </div>
      </div>

      <!-- 一鍵排入 -->
      <div v-if="$ScheduleStore.chosenPlayersArray.length==0"
      class="w-full justify-center flex">
        <button :disabled="GameInfo.sid==0 || GameInfo.roundID==0 || all_playersList.length== $ScheduleStore.existPlayers.length"
        @click="addAllPlayers()" class="w-[260px] h-[40px] bg-blue_d text-center text-white_wb rounded-[50px]
        disabled:bg-gray_m disabled:text-gray_l">一鍵排入</button>
      </div>

      <!-- 排入選取 -->
      <div v-else
      class="w-full justify-center flex gap-[10px] font-[400] tracking-widest text-[16px]">
       <button :disabled="GameInfo.sid==0 || GameInfo.roundID==0"
        @click="clearChosenPlayers()" class="w-[130px] h-[40px] border-[1px] border-gray_m  text-center text-gray_m rounded-[50px]
        disabled:bg-gray_m disabled:text-gray_l">清除選取</button>
       <button :disabled="GameInfo.sid==0 || GameInfo.roundID==0"
        @click="$ScheduleStore.ADD_SELECTED_PLAYERS" class="w-[130px] h-[40px] bg-blue_d text-center text-white_wb rounded-[50px]
        disabled:bg-gray_m disabled:text-gray_l">排入選取</button>
       
      </div>
       


    
  


  

      


     
      
  </div>


    
  
  
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
} from "vue";

import { useFormStore } from "../../src/stores/form";

import { useFormStore } from "../../src/stores/form";
const $store = useFormStore();

import { useScheduleStore } from "../../src/stores/schedule";
const $ScheduleStore = useScheduleStore();


const emits = defineEmits()
const { chosenSid, chosenRound, all_playersList, all_playersList_teams,unscheduledPlayerList } = defineProps(['chosenSid', 'chosenRound' , 'all_playersList', 'all_playersList_teams','unscheduledPlayerList']);

  const GameInfo =$ScheduleStore.nowGameInfo



// 球隊
const teamsList =ref([])
const show_team = ref([])
const toggle_showTeam =(team) =>{
  console.log('有作用')
const index =  show_team.value.indexOf(team)
if(index!=-1) {
  show_team.value.splice(index,1)
}else {
show_team.value.push(team)
}
}



   

  // 備註
const showHover = ref(-1)
const showHover_ID = ref(-1)
const showHover_teamID = ref(-1)
const toggle_showHover=(teamID,ID,index)=> {
showHover.value = index
showHover_ID.value = ID
showHover_teamID.value=teamID
}

// const all_playersList =ref([]) //所有選手資料


const single_PlayersList =ref([])  //個人桿數賽
const team_PlayersList =ref([])  //團體桿數賽
const twoPlayer_PlayersList = ref([]) //雙人桿數賽
const fairway_PlayersList = ref([]) //個人球道賽

// 點擊陣列
const ChosenPlayersArray = ref([])
const addChosenPlayers =(player, playerID, teamID)=>{
  const index= $ScheduleStore.chosenPlayersArray.indexOf(player)
  if(index==-1) {
    $ScheduleStore.chosenPlayersArray.push(player)
  // $ScheduleStore.chosenPlayersArray = ChosenPlayersArray
  console.log('$ScheduleStore.chosenPlayersArray', $ScheduleStore.chosenPlayersArray)

  // emits(ChosenPlayersArray.value)
  }else {
      $ScheduleStore.chosenPlayersArray.splice(index,1)

  // $ScheduleStore.chosenPlayersArray = ChosenPlayersArray
  console.log('$ScheduleStore.chosenPlayersArray', $ScheduleStore.chosenPlayersArray)


  }

  



}
// 清除選取
const clearChosenPlayers =()=>{
  ChosenPlayersArray.value =[]
  $ScheduleStore.chosenPlayersArray = ChosenPlayersArray
}
// 一鍵排入
const addAllPlayers = async ()=>{
// console.log('all_playersList_teams.players：', all_playersList.value)
$ScheduleStore.chosenGrid = [0,0]
await arrange()

$ScheduleStore.ADD_SELECTED_PLAYERS()
}
const arrange =() =>{
  console.log('$ScheduleStore.existPlayers',$ScheduleStore.existPlayers)
  console.log('unscheduledPlayerList',unscheduledPlayerList.value)

  $ScheduleStore.chosenPlayersArray = unscheduledPlayerList.value.filter(player => {
    return !$ScheduleStore.existPlayers.includes(player.playerID1);
  });
}




// Api
onMounted(()=>{
  // applyList()
  // if(GameInfo.roundID<200){
  //   SelSessionsPlayerList()
  // }else {
  //   SelSessionsRankingList()
  // }


})

watch(GameInfo.roundID,(newVal, oldVal) =>{
  if(newVal!=oldVal && newVal<200){
  // SelSessionsPlayerList()
  }
})

  // userToken
  const userToken_localStorage = JSON.parse(localStorage.getItem("userToken"))
  const userToken =userToken_localStorage.userToken

  // tid
   const tid_localStorage = JSON.parse(localStorage.getItem('now_Team'))
  const tid = tid_localStorage.now_Team



const  SelSessionsPlayerList= async () => {
  const requestBody = {
					tid: tid,
          cid:$store.competitionInfo[0].cid,

          // 測試
          sid: 1,
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
      unscheduledPlayerList.value = all_playersList.filter(player=>player.attendMark ==0)
      console.log('unscheduledPlayer', unscheduledPlayerList.value )

        // 所有球隊資料
  all_playersList.value.forEach(player => {
    if (!teamsList.value.includes(player.tName) ) {
      teamsList.value.push(player.tName);
      show_team.value.push(player.tName)
    }})

    console.log('show_team.value', show_team.value)




    // console.log('show_team.value', show_team.value)

		}else {
      console.log('預賽錯誤，RQB', requestBody)
      console.log('預賽錯誤，DATA', data)
    }

	} catch (error) {

		console.error("Error fetching data:", error);
	}
};






// 資料重新整理，按照球隊區分
const teamArray = ref([])
const teamFiltered = ref('所有組別')
const filtered_playersList_teams = ref([])
onMounted(() =>{
teamArray.value=[]
teamArray.value = $store.competitionCategory

if (!teamArray.value.find(team => team.gName === '所有組別')) {
  teamArray.value.unshift({ gName: '所有組別' });
}
}
)

watch(teamFiltered,(newVal, oldVal)=>{
  if(newVal!=oldVal) {
    

    filtered_playersList_teams.value = all_playersList_teams.reduce((acc, team) => {
        const filteredPlayers = team.players.filter(player => player.gName == newVal);
        if (filteredPlayers.length > 0) {
          acc.push({ tName: team.tName, players: filteredPlayers });
        }
        return acc;
      }, []);

      console.log(' filtered_playersList_teams.value', filtered_playersList_teams.value)
  }
})
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
    top: 10vh;
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
  transition: 0.5s;
}
 .v-leave-to {
 top: -100px;
 opacity: 0.5;
}

</style>

