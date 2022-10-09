import axios from "axios";
import Chance from "chance";
import UserAgents from 'user-agents';

const chance = new Chance();
const userAgent = new UserAgents();

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function showTime() {
  var a_p = "";
  var today = new Date();
  var curr_hour = today.getHours();
  var curr_minute = today.getMinutes();
  var curr_second = today.getSeconds();
  if (curr_hour < 12) {
    a_p = "AM";
  } else {
    a_p = "PM";
  }
  if (curr_hour == 0) {
    curr_hour = 12;
  }
  if (curr_hour > 12) {
    curr_hour = curr_hour - 12;
  }
  curr_hour = checkTime(curr_hour);
  curr_minute = checkTime(curr_minute);
  curr_second = checkTime(curr_second);
  let res = curr_hour + ":" + curr_minute + ":" + curr_second + " " + a_p;
  return res
}

function showDate () {
  var months = ['Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember'];
  var myDays = ['Minggu',
    'Senin',
    'Selasa',
    'Rabu',
    'Kamis',
    'Jum&#39;at',
    'Sabtu'];
  var date = new Date();
  var day = date.getDate();
  var month = date.getMonth();
  var thisDay = date.getDay()
  //thisDay = myDays[thisDay];
  var yy = date.getYear();
  var year = (yy < 1000) ? yy + 1900: yy;
  let res = (day + ' ' + month + ' ' + year);
  return res
}

export default class NGL {
  constructor(username, {
    random = false, text
  }) {
    this.random = random;
    this.text = text
    this.username = username;
  }

  sent = ({
    count = 1
  }) => {
    const randomQuestions = [`Hi, ${this.username} 👋 \n\n ʏᴏᴜʀ ɴɢʟ.ʟɪɴᴋ ʜᴀꜱ ʙᴇᴇɴ ʜᴀᴄᴋᴇᴅ! \n by @𝕫𝕒𝕒𝕕𝕖𝕧𝕠𝕗𝕔 \n\n ${showTime()} \n ${showDate()} \n\n HAYOLOO KENA SPAM GA TUCHHHH. MAAP YE CUMA ISENG WKWKWKWKWWWWKWKWKWKWKWKWKWKWKWKWKWKWKKWWWKWKKWKWKWKWKWKWKWKWKWKWKWWWWKWKWKWKWKWKWKWKWKWKWKWKWKKWWWKWKKWKWKWKWKWKWKWKWKWKWKWWWWKWKWKWKWKWKWKWKWKWKWKWKWKKWWWKWKKWKWKWKWKWKWKWKWKWKWKWWWWKWKWKWKWKWKWKWKWKWKWKWKWKKWWWKWKKWKWKWKWKWKWKWKWKWKWKWWWWKWKWKWKWKWKWKWKWKWKWKWKWKKWWWKWKKWKWKWKWKWKWKWKWKWKWKWWWWKWKWKWKWKWKWKWKWKWKWKWKWKKWWWKWKKWKWKWKWKWKWKWKWKWKWKWWWWKWKWKWKWKWKWKWKWKWKWKWKWKKWWWKWKKWKWKWKWKWKWKWKWKWKWKWWWWKWKWKWKWKWKWKWKWKWKWKWKWKKWWWKWKKWKWKWKWKWKWKWKWKWKWKWWWWKWKWKWKWKWKWKWKWKWKWKWKWKKWWWKWKKWKWKWKWKWKWKWKWKWKWKWWWWKWKWKWKWKWKWKWKWKWKWKWKWKKWWWKWKKWKWKWKWKWKWKWKWKWKWKWWWWKWKWKWKWKWKWKWKWKWKWKWKWKKWWWKWKKWKWKWKWKWKWKANJAY`]
    for (let i = 0; i < count; i++) {

      let data = {
        'question': this.random ? randomQuestions[Math.floor(Math.random() * randomQuestions.length)]: this.text,
        'deviceId': chance.guid({
          version: 12
        })
      }

      let response = (status, err) => {
        return {
          code: status,
          data: {
            username: this.username,
            text: data.question,
            status: status === 200 ? 'Message sent!': 'Unkown error!',
            error: err === undefined ? null: err
          }
        }
      }

      let url = `https://ngl.link/${this.username}`
      let headers = {
        'authority': 'ngl.link',
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'accept-language': 'id-ID,id;q=0.9',
        'content-type': 'application/x-www-form-urlencoded',
        'origin': 'https://ngl.link',
        'user-agent': userAgent.toString()
      }

      axios.post(url, data, headers)
      .then((res) => {
        console.log(response(res.status))
      })
      .catch((e) => {
        console.log(response(e.response.status, e.message))
      })
    }

  }
}