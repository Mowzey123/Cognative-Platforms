import {IProducerConfig, ProducerConfig, SimpleProducer} from "kafka-typescript"
import {ConsumerConfig, SimpleConsumer} from "kafka-typescript";

const rdkafka = require("node-rdkafka")
const rdkafkaProducer = rdkafka.Producer
const rdkafkaConsumer = rdkafka.KafkaConsumer;

const producers: { [topic: string]: SimpleProducer } = {}

class kafkaProducer {
  constructor(){
  }

  async createTopicProducer(topic: string, config: IProducerConfig){
    const prod = await new SimpleProducer().create(rdkafkaProducer, config).connect();
    prod.setTopic(topic);
    producers[topic] = prod
    return prod
  }

  createMessage(producer: any,key: any,topic: string,msg: Buffer,config: IProducerConfig){
    try{
      let prod =  new SimpleProducer().create(rdkafkaProducer, config).connect().then((producer)=>{
        try{
          producer.send(key,msg,topic);
        }catch(err){
          console.log(err);
        }
      }).catch((err)=>{
        console.log(err);
      });
    }catch(err){
      console.log("Failed to find producer");
    }
  }
}


function maketopic(topic: string,producer:string){
  const obj = new kafkaProducer();
  obj.createTopicProducer(producer, new ProducerConfig("localhost", "9092"))
  .then((x: any) => {
    producers[producer].send("1", new Buffer(topic));
  }).catch((err: any) => console.error(err))
}

export default maketopic; 