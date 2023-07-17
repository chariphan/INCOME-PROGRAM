//1 อ้างอิง elememt
const balance=document.getElementById('balance'); //ยอดคงเหลือ
const money_plus=document.getElementById('money-plus');//รายรับ
const money_minus=document.getElementById('money-minus');//รายจ่าย
const list=document.getElementById('list');//ประวัติธุรกรรม
const form=document.getElementById('form');//form
const text=document.getElementById('text');//ช่อง input ชื่อธุรกรรม
const amount=document.getElementById('amount');//ช่อง input จำนวนเงิน

//สร้าง ตัวแปรค่ามาไว้ทดลองเชคแทนการอินพุต
/*const dataTransaction=[
    {id:1,text:"ค่าขนม",amount:-100},
    {id:2,text:"ค่าไฟฟ้า",amount:-900},
    {id:3,text:"เงินเดือน",amount:20000},
    {id:4,text:"ค่าจ้าง",amount:30000}

]*/

//let transactions=dataTransaction;
//console.log(transactions);//จะได้ array ที่มี3 ค่าออกมา
let transactions=[];
//B
function inIt(){
    list.innerHTML='';
    //สร้าง loop ใน transactions เพื่อให้ได้ค่าครบทุกส่วนแต่ละอัน
    transactions.forEach(addDataToList);

    calculateMoney();
}

//A. addDataTolist ทำเพื่อกรองข้อมูล สัญลักษณ์
function addDataToList(transactions){
    //กรอง สัญลักษณ์ + รายรับ, -รายจ่าย
    const symbol=transactions.amount <0?'-':'+';// ถ้า <0 เป็น - ถ้า else เป็น + แต่มันจะได้แค่ค่าเดียวเราเลยต้องไปสร้าง loop เพื่อเอาแต่ละตัวใน init()
    //console.log(transactions.text);//พอ inIt()มันลูปทุกค่ามันจะทำให้เราสามารถเข้าถึงได้ทุกส่วนเช่น .text
    //พอเข้าถึงค่าแต่ละส่วนได้ เราต้องการเอาพวก ค่าขนม ไปแสดงในประวัติธุรกรรมนั่นก็คือ List ซึ่งเราจะเอา li ไปแมสดงใน list 

    //4 ทีนี้เราเหลือสถานะของli ว่ามันเป็นรายรับหรือรายจ่ายแบ่งตาม class minus,plus เราเลยจะกรอง
    const status=transactions.amount<0?'minus':'plus';

    //1สร้างตัวแปรเพื่อสร้าง li 
    const item=document.createElement('li');

    //4.1 แยก class ได้แล้วทีนี้เราจะเอา class ไปใส่ใน item
    item.classList.add(status);

    //D.3 แก้เลขใน ประวัติธุรกรรมให้มีคอมม่า
    const result=formatNumber(Math.abs(transactions.amount));
    //2 พอสร้างเสร็จ เราก็ลองโยนข้อมูลเข้าไป 
    //item.innerHTML='เงินเดือน <span>฿400</span> <button class="delete-btn">X</button>';
    //โยนเข้าไปได้ li ที่มีค่าแบบด้านบน ทีนี้เราจะทำให้มันเอาค่าที่เรา input อ่ะเข้าไปแทน
    item.innerHTML=`${transactions.text}<span>${symbol}${result}</span><button class="delete-btn" onclick="removeData(${transactions.id})">X</button>`;//math.abs ทำเพื่อให้มีแค่เลขเพราะเราเอาเครื่องหมายมาแล้วไม่งั้นเวลามีค่าลบมันจะมี -- 2 ตีว
    //3 เมื่อสร้าง li และค่าใน li เสร็จวิธีโยนคือ ประกาศว่า li คือ item นั้นเป็น child ของ list
    list.appendChild(item);//ตอนนี้มีค่าแสดงใน ประวัติlist แล้ว

}
// D.1ต้องการให้เลขเรามีคอมม่าอันนี้เขาให้ไปกอปในเนตมา เช่น 17,000
function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
//E.2 ทำเพื่อแรนด้อมค่า id 
function autoID(){
    return Math.floor(Math.random()*1000000)
}

//C คำนวณยอดเงินคงเหลือ
//การคำนวณเงินประกอบด้วย 3 ส่วน 1.ยอดเงินคงเหลือ 2 รายรับ 3 รายจ่าย ซึ่งการคำนวณต้องไปดึงข้อมูลมาจากประวัติธุรกรรม
function calculateMoney(){
    //C.1 เราจะได้ ค่า amount ใน taransactions มาเป็น arrays [-100, -900, 20000, 30000]
    const amounts=transactions.map(transactions=>transactions.amount);
    // C.2(ยอดคงเหลือ)กรองข้อมูล ฟีลเหมือน loop ที่เริ่มจาก ค่าเริ่มต้น 0 >> จะได้ค่า รวมเป็น=[-100, -900, 20000, 30000]=49000
    const total=amounts.reduce((result,item)=>(result+=item),0).toFixed(2);
    // C.3 รายรับ
    const income=amounts.filter(item=>item>0).reduce((result,item)=>(result+=item),0).toFixed(2); //ได้ค่า 50000
    // C.4 รายจ่าย
    const expense=(amounts.filter(item=>item<0).reduce((result,item)=>(result+=item),0)*-1).toFixed(2);// -1000
    
    //C.5ได้มาทั้ง 3 ค่าแล้วทีนี้เราจะเอามันทั้ง3 ไปแสดงแต่ละส่วนที่ที่มันควรอยู่
    //เอา total ไปแสดงใน ยอดคงเหลือ(ตัวแปรbalance)
    /*balance.innerText=`${total}`; //ค่าขึ้นแล้ว
    money_plus.innerText=`${income}`;
    money_minus.innerText=`${expense}`; */

    //D.2แก้เพื่อเอาคอมม่ามาคั่น
    balance.innerText=formatNumber(total);
    money_plus.innerText=formatNumber(income);
    money_minus.innerText=formatNumber(expense); 

}
//F จัดการปุ่มลบประวัติอ่ะ
function removeData(id){
    transactions=transactions.filter(transactions=>transactions.id!==id);
    inIt();


}
//E.3
function addTransaction(e){
    e.preventDefault();
    if(text.value.trim()==='' || amount.value.trim()===''){
        alert('กรุณาป้อนข้อมูลให้ครบ')
    }else{
        //เชคเสร็จปุ้ปว่าใส่2 ช่องinput แล้วเราก็จะมากรองค่าที่ใส่ 
        const data={
            id:autoID(),
            text:text.value,
            amount:+amount.value// amount เป็น str เราต้องการให้เป็น int เลยใส่ + นำหน้าเป็นการแปลง
        }
        //เอา data ไปใส่ใน transactions
        transactions.push(data);
        addDataToList(data);
        calculateMoney();
        text.value='';
        amount.value='';


    }
}
//E.1 ทำในส่วนของการเพิ่มธุรกรรม และจำนวนเงิน ถ้าsubmit จะให้ส่งไปยัง addTransaction
form.addEventListener('submit',addTransaction);
inIt();
