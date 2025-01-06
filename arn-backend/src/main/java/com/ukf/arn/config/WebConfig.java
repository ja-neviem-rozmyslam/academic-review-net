package com.ukf.arn.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.web.SortArgumentResolver;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    private final SortArgumentResolver sortArgumentResolver;

    public WebConfig(SortArgumentResolver sortArgumentResolver) {
        this.sortArgumentResolver = sortArgumentResolver;
    }

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
        resolvers.add(sortArgumentResolver);
    }
}