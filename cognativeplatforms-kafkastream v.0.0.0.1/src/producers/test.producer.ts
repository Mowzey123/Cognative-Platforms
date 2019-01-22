import {kafkaproducer} from '../lib/kafka/kafkaproducer';
import {Data} from '../lib/data';

class testProducer{
    tesprod: kafkaproducer;
    constructor(){
        this.tesprod = new kafkaproducer();
    }

    createTopic(producer:string,topic: string){
        this.tesprod.createTopicProducer(producer).then((producer)=>{
            producer.setTopic(topic);
        }).catch((err)=>{
            console.log(err);
        });
    }

    sendmessagetotopic(topic: string,msg: string){
        this.tesprod.sendMessage("Cognative",1,"hehe",new Buffer(msg));
    }
}

const testproducer = new testProducer();
export default testproducer;