const $=id=>document.getElementById(id);
const money=n=>new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(n);
function calculate(){
 const price=+$('price').value, down=Math.min(+$('down').value,price), rate=+$('rate').value/1200, months=+$('months').value;
 const principal=price-down;
 const emi=rate?principal*rate*Math.pow(1+rate,months)/(Math.pow(1+rate,months)-1):principal/months;
 const total=emi*months;
 $('priceOut').textContent=money(price); $('downOut').textContent=money(down);
 $('rateOut').textContent=$('rate').value+'%'; $('monthsOut').textContent=months+' months';
 $('emi').textContent=money(emi); $('total').textContent=money(total); $('heroEmi').textContent=money(emi);
 const income=+$('income').value, existing=+$('existing').value, ratio=(emi+existing)/income*100;
 $('incomeOut').textContent=money(income); $('existingOut').textContent=money(existing);
 $('bar').style.width=Math.min(ratio,100)+'%';
 if(ratio<15){$('score').textContent='🟢 Comfortable';$('scoreText').textContent='The estimated monthly debt burden is relatively low compared with the income entered.'}
 else if(ratio<30){$('score').textContent='🟡 Think Twice';$('scoreText').textContent='The payment takes a noticeable share of the income entered. Review your budget, savings and other commitments.'}
 else{$('score').textContent='🔴 High Pressure';$('scoreText').textContent='The estimated monthly debt burden is high relative to the income entered. Consider reducing the financed amount or waiting.'}
}
['price','down','rate','months','income','existing'].forEach(id=>$(id).addEventListener('input',calculate));calculate();