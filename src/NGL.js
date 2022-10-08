import axios from "axios";
import Chance from "chance";
import UserAgents from 'user-agents';

const chance = new Chance();
const userAgent = new UserAgents();

export default class NGL{
    constructor(username, {random = false, text}) {
        this.random = random;
        this.text = text
        this.username = username;
    }
    
    sent = ({count = 1}) => {
        const randomQuestions = [`Hi, ${this.username} 👋 \n\n ʏᴏᴜʀ ɴɢʟ.ʟɪɴᴋ ʜᴀꜱ ʙᴇᴇɴ ʜᴀᴄᴋᴇᴅ! \n by @𝕫𝕒𝕒𝕕𝕖𝕧𝕠𝕗𝕔 \n\n HAYOLOO KENA SPAM GA TUCHHHH. MAAP YE CUMA ISENG WKWKWKWKWWWWKWKWKWKWKWKWKWKWKWKWKWKWKKWWWKWKKWKWKWKWKWKWKWKWKWKWKWWWWKWKWKWKWKWKWKWKWKWKWKWKWKKWWWKWKKWKWKWKWKWKWKWKWKWKWKWWWWKWKWKWKWKWKWKWKWKWKWKWKWKKWWWKWKKWKWKWKWKWKWKWKWKWKWKWWWWKWKWKWKWKWKWKWKWKWKWKWKWKKWWWKWKKWKWKWKWKWKWKWKWKWKWKWWWWKWKWKWKWKWKWKWKWKWKWKWKWKKWWWKWKKWKWKWKWKWKWKWKWKWKWKWWWWKWKWKWKWKWKWKWKWKWKWKWKWKKWWWKWKKWKWKWKWKWKWKWKWKWKWKWWWWKWKWKWKWKWKWKWKWKWKWKWKWKKWWWKWKKWKWKWKWKWKWKWKWKWKWKWWWWKWKWKWKWKWKWKWKWKWKWKWKWKKWWWKWKKWKWKWKWKWKWKWKWKWKWKWWWWKWKWKWKWKWKWKWKWKWKWKWKWKKWWWKWKKWKWKWKWKWKWKWKWKWKWKWWWWKWKWKWKWKWKWKWKWKWKWKWKWKKWWWKWKKWKWKWKWKWKWKWKWKWKWKWWWWKWKWKWKWKWKWKWKWKWKWKWKWKKWWWKWKKWKWKWKWKWKWKANJAY`]
        for(let i = 0; i < count; i++){

            let data = {
                'question': this.random ? randomQuestions[Math.floor(Math.random() * randomQuestions.length)] : this.text,
                'deviceId': chance.guid({version: 12})
            }

            let response = (status, err) => {
                return {
                    code: status,
                    data: {
                        username : this.username,
                        text : data.question,
                        status: status === 200 ? 'Message sent!' : 'Unkown error!',
                        error: err === undefined ? null : err
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
