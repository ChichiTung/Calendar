import { defineStore } from 'pinia'
import { ref, watchEffect } from 'vue'
import { useRouter } from "vue-router";
import { DateTime } from 'luxon';

const router = useRouter();


export const useScheduleStore = defineStore('schedule', () => {
  // 安排競賽日程
  const timePicked = ref(-1)
  const timePicked_end = ref(-1)

  // 選擇的地點
  const chosenFid = ref('')
  // 選擇的日期
  const chosenDate = ref('')



  // 競賽資訊(選手陣列外的)
  const nowGameInfo  = ref({
    tid:'',
    cid:'',
    seid: 0, // 0是新增 
    seName: '',
    // seDate: '2023-12-22',
    seDate: '',
    seStart: '',
    seEnd: '',
    fid: '',
    fName: '',
    defState: 0,
    sid: 0, 
    roundID:0,
  })

  // 原本已排入的選手數量
  const originPlayersCount = ref(0)
  
  // 新增場次 Popup
  
  // 點選的選手
  const chosenPlayersArray = ref([])

  // 點選欲排入的欄位
  let chosenGrid=ref([])

  // 初始table
  let temp_playersInSessions = ref([])
	
  //排入選取
  const ADD_SELECTED_PLAYERS = () => {
    // console.log('chosenPlayersArray.value',chosenPlayersArray.value)
    // console.log('chosenGridchosenGridchosenGridchosenGrid', chosenGrid.value)
		console.log('temp_playersInSessions.value', temp_playersInSessions.value[0].rowPlayers[1])

// 先跑選手陣列
	for(let i =0;  i<chosenPlayersArray.value.length; i++){

		// 跑選手(橫列)
		for(let k  =  chosenGrid.value[1]; k<5;  k++){
			console.log('$ScheduleStore.chosenGrid.value[1]', chosenGrid.value)

			// 跑點擊的直行
		if( k==chosenGrid.value[0])	{
			// 最大 18 道次
			for( let j = chosenGrid.value[0]; j<18; j++ ) {
			
				console.log('擺放位置',[j,k])
				console.log(chosenPlayersArray.value[i])

				if(isObjectEmpty(temp_playersInSessions.value[j].rowPlayers[k])){
						console.log('格子是空的!!!')
					temp_playersInSessions.value[j].rowPlayers[k]= chosenPlayersArray.value[i]

          if(chosenPlayersArray.value[i].playerID1){
            existPlayers.value.push(chosenPlayersArray.value[i].playerID1)
          }else {
             existPlayers.value.push(chosenPlayersArray.value[i].preGID,chosenPlayersArray.value[i].preRanking)
          }
					i++;
				}else {
				 console.log('格子有東西')
				}
        	// temp_playersInSessions[j].rowPlayers[k]= chosenPlayersArray.value[i]


				  if (i >= chosenPlayersArray.value.length) {
              break;  // 如果沒有下一筆資料了，跳出迴圈
            }
		}
		  if (i >= chosenPlayersArray.value.length) {
              break;  // 如果沒有下一筆資料了，跳出迴圈
            }
		}
		else {
				
						for( let j = chosenGrid.value[0]; j<18; j++ ) {
				console.log('擺放位置(先)',[j,k])
				
				if(isObjectEmpty(temp_playersInSessions.value[j].rowPlayers[k])){
					console.log('格子是空的!!!')

         	temp_playersInSessions.value[j].rowPlayers[k]= chosenPlayersArray.value[i]

          

           if(chosenPlayersArray.value[i].playerID1){
            existPlayers.value.push(chosenPlayersArray.value[i].playerID1)
          }else {
             existPlayers.value.push([chosenPlayersArray.value[i].preGID,chosenPlayersArray.value[i].preRanking])
          }
					i++;

				}else {
				 console.log('格子有東西')
				}

				  if (i >= chosenPlayersArray.value.length) {
              break;  // 如果沒有下一筆資料了，跳出迴圈
            }
		}
		  if (i >= chosenPlayersArray.value.length) {
              break;  // 如果沒有下一筆資料了，跳出迴圈
            }
		}
		
		}
	}
	console.log('temp_playersInSessions', temp_playersInSessions)
  console.log('existPlayers', existPlayers.value)
	chosenPlayersArray.value=[]
  }

  // 換位置
  const temp_changePlayer_row = ref(-1)
  const temp_changePlayer_sort = ref(-1)

  const CHANGE_PLAYERS = (rowID, sortID, player) => {
    console.log('換位置啦')
    console.log('chosenGridchosenGridchosenGridchosenGrid', chosenGrid.value)

    // const tempData = temp_playersInSessions[rowID].rowPlayers[chosenGrid.value[1]]
temp_playersInSessions.value[chosenGrid.value[0]].rowPlayers[chosenGrid.value[1]]= player

temp_playersInSessions.value[rowID].rowPlayers[sortID]= ''

temp_changePlayer_row.value=-1
temp_changePlayer_sort.value=-1

  }

const deleteMark =ref([]) //事件冒泡待修正，先用額外變數設定

  // 刪除排入的選手
  const DELETE_PLAYER = (rowID,sortID,playerID) =>{
temp_playersInSessions.value[rowID].rowPlayers[sortID]= {}
deleteMark.value=[rowID,sortID]
console.log('deleteMark', deleteMark.value)

const index = existPlayers.value.indexOf(playerID)
if(index!==-1) {existPlayers.value.splice(index,1)}

temp_changePlayer_row.value=-1
temp_changePlayer_sort.value=-1
}


  // 判斷是否為空物件
  const isObjectEmpty = (obj) => {
    // 使用 Object.keys() 檢查物件是否為空
    return Object.keys(obj).length === 0;
  };

  // 已放入的選手陣列
  const existPlayers=ref([])

  // 初始化 temp_playersInSessions
 const  initializeTempPlayersInSessions=(defState) =>{
    if (defState == 2) {
      return new Array(18).fill(null).map(() => ({
         sTime: nowGameInfo.seStart,
        rowPlayers: Array.from({ length: 5 }, () => ({}))
      }));
    } else if (defState == 1) {
			const row_1_Time = nowGameInfo.value.seStart 
      return new Array(1).fill(null).map(() => ({
        sTime: row_1_Time,
        rowPlayers: Array.from({ length: 5 }, () => ({}))
      }));
    } else {
      // Handle other cases if necessary
      return [];
    }
  }

  // 監聽 nowGameInfo.defState 的變化，重新初始化 temp_playersInSessions
  watchEffect(() => {
  temp_playersInSessions.value = initializeTempPlayersInSessions(nowGameInfo.value.defState);
})

// 計算結束時間：同時開始
const cal_seEnd =(seStart) =>{
  const [startHours, startMinutes] = seStart.split(':').map(Number);
  const temp = DateTime.local().set({ hours: startHours, minutes: startMinutes }).plus({ minutes: 80 });

  return temp.toFormat('HH:mm')
}
// 計算結束時間：第一道
const cal_seEnd_fairway =() =>{

  // console.log('78787878787887878' ,temp_playersInSessions.value[temp_playersInSessions.value.length - 1])
  // const lastTime = '13:00';
  const lastTime = temp_playersInSessions.value[temp_playersInSessions.value.length - 1] 
                ? temp_playersInSessions.value[temp_playersInSessions.value.length - 1].sTime 
                : '00:00';



  const [startHours, startMinutes] = lastTime.split(':').map(Number);

  const temp = DateTime.local().set({ hours: startHours, minutes: startMinutes }).plus({ minutes: 80 });

  return temp.toFormat('HH:mm')
}
// 監聽 nowGameInfo.defState 的變化，算結束時間
watchEffect(() =>{
  if(nowGameInfo.value.defState==2){
    nowGameInfo.value.seEnd = cal_seEnd(nowGameInfo.value.seStart)
  }else {
    nowGameInfo.value.seEnd = cal_seEnd_fairway()

  }
})

// 新增一列
const ADD_ROW = ()=>{
	const lastTime = temp_playersInSessions.value[temp_playersInSessions.value.length - 1].sTime;
	const [lastHours, lastMinutes] = lastTime.split(':').map(Number);
  const newMinutes = lastMinutes + 6;
  const totalMinutes = lastHours * 60 + newMinutes;
  const newHours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;

  const newSTime = `${String(newHours).padStart(2, '0')}:${String(remainingMinutes).padStart(2, '0')}`;


	 temp_playersInSessions.value.push({
		 sTime: newSTime,
    rowPlayers: Array.from({ length: 5 }, () => ({}))
  });

	console.log(' temp_playersInSessions.value temp_playersInSessions.value',  temp_playersInSessions.value)
}

// 刪除一列
const DELETE_ROW = (index)=>{

// 時間陣列
	const timeArray = temp_playersInSessions.value.map(item=>item.sTime) // 刪除行的時間
	console.log(timeArray)
	


	// 過濾掉該列的選手空值
	const rowPlayers = temp_playersInSessions.value[index].rowPlayers.filter(item =>{
  return  Object.keys(item).length !== 0; 
} )

	console.log('rowPlayers', rowPlayers)


// 遍歷該列選手，然後從右邊區塊恢復可以點擊的狀態
rowPlayers.forEach(item => {
  const index = existPlayers.value.indexOf(item.playerID1);
  if (index !== -1) {
    existPlayers.value.splice(index, 1);
  }
});

temp_playersInSessions.value.splice(index,1)

// 更新時間
  for (let i = 0; i < temp_playersInSessions.value.length; i++) {
  temp_playersInSessions.value[i].sTime = timeArray[i];
  }

  nowGameInfo.value.seEnd = timeArray[timeArray.length-2]
  console.log('nowGameInfo.value.seEnd',nowGameInfo.value.seEnd)
	

}

	const RESET =()=>{
		nowGameInfo.value.tid ='';
		nowGameInfo.value.cid ='';
		nowGameInfo.value.seid=0;
		// nowGameInfo.value.seName ='';
		nowGameInfo.value.seDate = '';
		nowGameInfo.value.seStart = '';
		nowGameInfo.value.seEnd = '';
		nowGameInfo.value.fid = '';
		nowGameInfo.value.fName = '';
    nowGameInfo.value.defState =0;
		nowGameInfo.value.sid =0;
		nowGameInfo.value.roundID =0;
		temp_playersInSessions.value=[];

    chosenGrid.value=[-1,-1];
    chosenPlayersArray.value=[];
    
	}

  return { 
    nowGameInfo,
    originPlayersCount,
    chosenFid,
    chosenDate,
    timePicked,
    timePicked_end,
    chosenPlayersArray,
    temp_playersInSessions,
    chosenGrid,
    existPlayers,

		initializeTempPlayersInSessions,
    cal_seEnd,

    ADD_SELECTED_PLAYERS,
    CHANGE_PLAYERS,
    DELETE_PLAYER,
		RESET,
		ADD_ROW,
		DELETE_ROW,

    deleteMark,
    temp_changePlayer_row,
    temp_changePlayer_sort,
    isObjectEmpty,
  }
},
{
  persist: [
    {
      key:'chosenPlayersArray',
      paths: ['chosenPlayersArray']
    },
    {
      key:'timePicked',
      paths: ['timePicked']
    },
    {
      key:'temp_changePlayer_row',
      paths: ['temp_changePlayer_row']
    },
    {
      key:'temp_changePlayer_sort',
      paths: ['temp_changePlayer_sort']
    },
    {
      key:'nowGameInfo',
      paths: ['nowGameInfo']
    },
  ]
})
