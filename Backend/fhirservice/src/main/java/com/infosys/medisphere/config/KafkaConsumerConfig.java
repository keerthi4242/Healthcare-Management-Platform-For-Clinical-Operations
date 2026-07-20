package com.infosys.medisphere.config;

import java.util.HashMap;
import java.util.Map;

import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.core.DefaultKafkaConsumerFactory;
import org.springframework.kafka.support.serializer.JsonDeserializer;

import com.infosys.medisphere.model.Vital;

@Configuration
public class KafkaConsumerConfig {
	  @Bean
	    public ConsumerFactory<String, Vital> consumerFactory() {

	        JsonDeserializer<Vital> deserializer =
	                new JsonDeserializer<>(Vital.class);

	        deserializer.addTrustedPackages("com.infosys.medisphere.model");

	        Map<String, Object> props = new HashMap<>();

	        props.put(
	            ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG,
	            "localhost:9092"
	        );

	        props.put(
	            ConsumerConfig.GROUP_ID_CONFIG,
	            "fhir-group"
	        );

	        props.put(
	            ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG,
	            StringDeserializer.class
	        );

	        return new DefaultKafkaConsumerFactory<>(
	                props,
	                new StringDeserializer(),
	                deserializer
	        );
	    }


	    @Bean
	    public ConcurrentKafkaListenerContainerFactory<String, Vital> kafkaListenerContainerFactory() {

	        ConcurrentKafkaListenerContainerFactory<String, Vital> factory =
	                new ConcurrentKafkaListenerContainerFactory<>();

	        factory.setConsumerFactory(consumerFactory());

	        return factory;
	    }

}
