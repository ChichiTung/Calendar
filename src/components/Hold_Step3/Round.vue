<template>
    <div class="w-full h-auto mb-[30px] md:px-[3vw] lg:px-[4vw] ">
     <!-- 未展開 -->
    <div  v-if="(!open && !showRound) || !open"
    class="rounded-[20px]  h-[96px]  bg-[#EEE] w-full l text-[24px] text-[#999] leading-[96px] px-[30px] mb-[30px]
    flex  justify-between  drop-shadow-lg items-center"
    :class="{'text-[#222] bg-white' : $store.competitionInfo[0].cState>1}">
      
      <div class="flex gap-[10px] items-center ">
        <img v-if="!roundExisted"
        src="../../../assets/images/admin/check.png" class="w-[30px] h-[30px] ">
        <img v-else src="../../../assets/images/admin/check_black.png" class="w-[30px] h-[30px] ">
        <p :class="$store.competitionInfo[0].cState<2 ? 'text-[#999]' : 'text-[#222]'"
        class="font-semibold">各賽制輪數設定</p>
      </div>
      <button   @click="toggle_showRound()" 
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
         <img v-if="!roundExisted"
        src="../../../assets/images/admin/check.png" class="w-[30px] h-[30px] ">
        <img v-else src="../../../assets/images/admin/check_black.png" class="w-[30px] h-[30px] ">
      <p>各賽制輪數設定</p>
      </div>

       <button    @click="toggle_showRound()">
        <img src="../../../assets/images/admin/drop.png" class="w-[32px] h-[16px] rotate-180">
      </button>
    </div>

    <!-- 賽制按鈕 -->
    <div class="w-full flex gap-[10px]">
      <!-- 個人+團體 -->
      <button class="w-[171px] h-[44px] p-[20px] rounded-t-[6px] bg-green_l">個人 + 團體桿數賽</button>
      <!-- 雙桿-->
      <!-- <button class="w-[122px] h-[44px] p-[20px] rounded-t-[6px] bg-gray_l">雙人桿數賽</button> -->
      <!-- 球道-->
      <!-- <button class="w-[122px] h-[44px] p-[20px] rounded-t-[6px] bg-gray_l">個人球道賽</button> -->

    </div>

    <!-- 表頭 -->
    <div class="w-full bg-white h-[41px] px-[10px] flex text-gray_d text-[14px] font-semibold mb-[10px] rounded-[4px] shadow-lg">
      <div class="w-[160px] p-[10px] text-start ">
        組別
      </div>
     <div class="w-[320px] p-[10px] text-start ">
        預賽
      </div>
      <div class="w-[320px] p-[10px] text-start ">
        複賽
      </div>
      <div class="w-[320px] p-[10px] text-start ">
        決賽
      </div>
    </div>


    <div v-for="(cat,index) in $FormatStore.formatArray"
        class="flex flex-col gap-[10px]">
          <div 
         class="w-full p-[20px] bg-white_wb flex  justify-between items-center mb-[10px] shadow-lg">

          <!-- 組別 section -->
        <div class="w-full  flex   items-center">
          <!-- 組別-->
          <div   class="w-[160px]">
             {{ cat.gName }}
          </div>

          <!-- 預賽 -->
          <div class="w-[320px] flex items-center ">
          <select v-model="cat.roundNum1"
										class="bg-white w-[150px] h-[44px] mr-[20px] border-[1px] border-solid border-[#999] rounded-[4px] text-start   font-medium text-[16px] pr-[50px] pl-3 disabled:bg-white
                    hover:outline-none hover:border-black_m hover:ring-0
                    focus:outline-none focus:border-black_m focus:ring-0"
										>
											<option
						v-for="(option, index) in  preComOption"
						:key="option"
						:value="index+1"
						style="padding-bottom: 20px; font-weight: 200;"
					>
          
						{{ option }}
					</option>
					
					</select>

          <div class="flex leading-[44px]">
            <p>取</p> 
            <input type="number" 
            v-model="cat.roundProm1"
            placeholder="0"
        class="w-[50px] h-[44px] mx-[5px] bg-[#FFF]  rounded-[4px]
        border-[1px] border-solid border-[#999]  text-black text-start placeholder:font-medium   placeholder:text-white/50
        font-normal 
        focus:outline-none focus:border-[#999]  focus:ring-[#999]  focus:ring-none
        hover:outline-none hover:border-black_m hover:ring-0        " 
       >
            <p>名</p>
         <!-- :class="{'border-red_error':!$store.competitionInfo[0].competitionDirected && $store.competitionInfo[0].competitionType > 1 && submitDisabled}" -->
          </div>
          </div>

          <!-- 複賽 -->
          <div class="w-[320px] flex items-center ">
          <select v-model="cat.roundNum2"
										class="bg-white w-[150px] h-[44px] mr-[20px] border-[1px] border-solid border-[#999] rounded-[4px] text-start   font-medium text-[16px] pr-[50px] pl-3 disabled:bg-white
                    hover:outline-none hover:border-black_m hover:ring-0
                    focus:outline-none focus:border-black_m focus:ring-0"
										>
											<option
						v-for="(option, index) in  semiOption"
						:key="option"
						:value="index+1"
						style="padding-bottom: 20px; font-weight: 200;"
					>
          
						{{ option }}
					</option>
					
					</select>

          <div class="flex leading-[44px]">
            <p >取</p> 
            <input 
            	:disabled="cat.roundNum2==1"
            type="number" 
            v-model="cat.roundProm2" 
        class="w-[50px] h-[44px] mx-[5px] bg-[#FFF]  rounded-[4px]
        border-[1px] border-solid border-[#999]  text-black text-start placeholder:font-medium   placeholder:text-white/50
        font-normal 
        focus:outline-none focus:border-[#999]  focus:ring-[#999]  focus:ring-none
        hover:outline-none hover:border-black_m hover:ring-0
        disabled:bg-gray_l disabled:text-gray_d" 
       >
            <p>名</p>
         <!-- :class="{'border-red_error':!$store.competitionInfo[0].competitionDirected && $store.competitionInfo[0].competitionType > 1 && submitDisabled}" -->
          </div>
          </div>

          <!-- 決賽 -->
          <div class="w-[320px] flex items-center ">
          <select v-model="cat.roundNum3"
          :disabled="cat.roundNum2==1"
										class="bg-white w-[150px] h-[44px] mr-[20px] border-[1px] border-solid border-[#999] rounded-[4px] text-start   font-medium text-[16px] pr-[50px] pl-3 
                    hover:outline-none hover:border-black_m hover:ring-0
                    focus:outline-none focus:border-black_m focus:ring-0
                    disabled:bg-gray_l disabled:text-gray_d"
										>
											<option
						v-for="(option, index) in  finalOption"
						:key="option"
						:value="index+1"
						style="padding-bottom: 20px; font-weight: 200;"
					>
          
						{{ option }}
					</option>
					
					</select>

          <div class="flex leading-[44px]">
            <p>取</p> 
            <input type="number" 
            v-model="cat.roundProm3"
             :disabled="cat.roundNum3==1"
            placeholder="0"  
        class="w-[50px] h-[44px] mx-[5px] bg-[#FFF]  rounded-[4px]
        border-[1px] border-solid border-[#999]  text-black text-start placeholder:font-medium   placeholder:text-white/50
        font-normal 
        focus:outline-none focus:border-[#999]  focus:ring-[#999]  focus:ring-none
        hover:outline-none hover:border-black_m hover:ring-0
 disabled:bg-gray_l disabled:text-gray_d " 
       >
            <p>名</p>
         <!-- :class="{'border-red_error':!$store.competitionInfo[0].competitionDirected && $store.competitionInfo[0].competitionType > 1 && submitDisabled}" -->
          </div>
          </div>
           

          
         </div>

      

        </div>
    </div>

    <!-- 申請審核 按鈕 -->
    <div class="w-full flex justify-end pb-[20px] gap-[20px]">
     
      
      <button 
      @click="saveAll()"
        class="w-[149px] h-[40px] mt-[20px] rounded-[50px] text-center leading-[40px] text-white bg-green_m disabled:bg-gray_m disabled:text-gray_l ">
           儲存輪數設定
        </button>
        
        

        <button :disabled= "approving"   
          @click="submitSection4(0)"
        v-if="!approving && $store.competitionInfo[0].competitionType == 0 && !openReg"
         class="w-[115px] h-[40px] mt-[20px] rounded-[50px] text-center leading-[40px] text-white bg-green_m ">
           開放報名
        </button>

        <button disabled
        v-if="openReg "
         class="w-[115px] h-[40px] mt-[20px] rounded-[50px] text-center leading-[40px] text-white bg-green_m 
         disabled:bg-green_d ">
           已發佈報名
        </button>
    </div>
      
    <div>

      
        </div>
    </div>
        <div>
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
  defineProps
} from "vue";

import { useFormStore } from "../../stores/form";
const $store = useFormStore();
// import { useFormatStore } from "../../stores/format";
// const $FormatStore = useFormatStore();

const emits = defineEmits()
const { approving,complete_Section3, tid, userToken, unfoldSection4, saveAll_api, open} = defineProps(['approving', 'complete_Section3', 'tid', 'userToken', 'unfoldSection4', 'saveAll_api', 'open']);

// 預賽選項
const preComOption = ['1 輪','2 輪','3 輪','4 輪']
const semiOption = ['不比複賽','1 輪','2 輪','3 輪','4 輪',]
const finalOption = ['不比決賽','1 輪','2 輪','3 輪','4 輪',]



const showRound = ref(false)
const toggle_showRound=()=>{
  showRound.value = !showRound.value
  if(showRound) {
    emits('showRound')
    emits('roundFinished')

  }
  
}









const submitDisabled = ref(false)




const saveAll =() =>{
// UpdComSystem()
}



//  call API
// 賽制輪數設定
const UpdComSystem = async() =>{

  const categoryArray_api = $FormatStore.formatArray.filter(item => item.gid<=3).map(item=>({
  gid: item.gid,
  roundNum1:  item.roundNum1,
  roundProm1: item.roundProm1,
   roundNum2: item.roundNum2,
  roundProm2: item.roundNum2 === 1 ? 1 : item.roundProm2,
   roundNum3: item.roundNum3,
  roundProm3: item.roundNum3  === 1 ? 1 : item.roundProm3,
  }))

  const requestBody = {
    tid: tid,
    cid:$store.competitionInfo[0].cid,
    sid: 1,
    reqUpdComSystem2: categoryArray_api,
  }

  console.log(requestBody)

	try {
		const response = await fetch(
			`https://api.antqtech.com/Woodball_Test/Competition/UpdComSystem`,
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
      
		console.log('成功送出')
    }else{
		console.log(data)

    }

	} catch (error) {

		console.error("Error fetching data:", error);
	}


}

// 查詢賽制輪數
const SelComSystem = async() =>{
  const requestBody = {
    tid: tid,
    cid:$store.competitionInfo[0].cid,
    // sid: 1,
  }

  console.log('SelComSystem',requestBody)

	try {
		const response = await fetch(
			`https://api.antqtech.com/Woodball_Test/Competition/SelComSystem`,
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
      
    roundExisted.value = true

    // 先只推個人
		console.log('成功查詢SelComSystem',data.data1[0].data2)

    $FormatStore.formatArray = data.data1[0].data2.map(item =>({
      gName: item.gName,
      roundNum1: item.roundNum1 ,
      roundProm1: item.roundProm1 ,
      roundNum2: item.roundNum2+1 ,
      roundProm2: item.roundProm2 ,
      roundNum3: item.roundNum3+1 ,
      roundProm3: item.roundProm3 ,

    }))
    console.log('$FormatStore.formatArray', $FormatStore.formatArray)

    }else{
		console.log('查詢不到SelComSystem', data)

    }

	} catch (error) {

		console.error("Error fetching data:", error);
	}


}




const categoryArray =ref([])

onMounted(() =>{
const temp_categoryArray = $store.competitionCategory.map(item =>
({
  gid: item.gid,
  gName: item.gName,
  roundNum1: 1,
  roundProm1: 3,
   roundNum2: 1,
  roundProm2: 0,
   roundNum3: 1,
  roundProm3: 0,
}))

categoryArray.value = temp_categoryArray
$FormatStore.formatArray = temp_categoryArray

// console.log('$FormatStore.formatArray', $FormatStore.formatArray)
SelComSystem()
})

const roundExisted = ref(false)

// 條件判斷
// watch( categoryArray, (newValue, oldValue) => {
//   newValue.forEach((cat, index) => {
//     console.log('newValue', newValue)
//     if (cat.roundNum2 == 0) {
//       // 使用 store.commit 來修改數據
//       console.log('是0000000啊')
//       console.log('index：：',index )
//       // cat.roundProm2 = 0
//       // console.log(categoryArray.value[index])
//       // categoryArray.value[index].roundProm2 = 0;
//       // $FormatStore.commit('updateRoundProm2', { index, value: 0 });
//     }
//   });
// });
</script>

<style scoped>
/* input[type=radio] {
  color: #DDDDDD !important,
} */
</style>