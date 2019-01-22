import {ConsumerConfig, SimpleConsumer} from "kafka-typescript";

const rdkafka = require("node-rdkafka")
const rdkafkaConsumer = rdkafka.KafkaConsumer;

class kafkaConsumer{
    consumerConfig : ConsumerConfig;
    constructor(host: string, port: string,group: string){
      this.consumerConfig  = new ConsumerConfig(host, port ,group);
    }
  
    createConsumer(topics: string[]){
      new SimpleConsumer().create(rdkafkaConsumer, topics, this.consumerConfig)
    .onMessage(({topic, key, value}) =>
      console.log("Rec'd", topic.toString(), key.toString(), value.toString()))
    .connect()
    }
  
  }

  export function createConsumer(){
    const consumerobj = new kafkaConsumer("localhost","9091","Congative-Consumer");
    consumerobj.createConsumer(["hehe"]); 
  }