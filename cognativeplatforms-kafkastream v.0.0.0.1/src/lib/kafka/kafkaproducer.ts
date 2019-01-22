import {IProducerConfig, ProducerConfig, SimpleProducer} from "kafka-typescript"
const rdkafka = require("node-rdkafka")
const rdkafkaProducer = rdkafka.Producer;

const producers: { [topic: string]: SimpleProducer } = {}

export class kafkaproducer{
  producer:any;
  config: ProducerConfig;

  constructor(){
    this.config  = new ProducerConfig("localhost","9092");
  }

  async createTopicProducer(topic: string){
    const prod = await new SimpleProducer().create(rdkafkaProducer, this.config).connect();
    prod.setTopic(topic);
    producers[topic] = prod
    return prod
  }

  sendMessage(producer: string,key: any,topic: string,msg: Buffer){
    try{
      new SimpleProducer().create(rdkafkaProducer,this.config).connect().then((producer)=>{
        try{
          console.log(producer.send(key,msg,topic));
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




