package integration;
import java.io.IOException;

import com.microsoft.rest.RestClient;
import com.microsoft.rest.ServiceResponseBuilder;
import com.microsoft.rest.serializer.JacksonAdapter;

import okhttp3.Interceptor;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import retrofit2.Retrofit;

public class PictureparkRestClient {
	public static RestClient Create(final String apiServer, final String customerAlias) {
    	class PictureparkHeaderAppender implements Interceptor {
			public Response intercept(Chain chain) throws IOException {
			    Request request = chain.request();
			    request = request.newBuilder().addHeader("Picturepark-CustomerAlias", customerAlias).build();			    
			    request = request.newBuilder().addHeader("Accept", "application/json").build();			    
			    Response response = chain.proceed(request);
			    return response;
			}
        }

    	return new RestClient.Builder(new OkHttpClient.Builder(), new Retrofit.Builder())
            .withResponseBuilderFactory(new ServiceResponseBuilder.Factory())
		    .withBaseUrl(apiServer)
            .withSerializerAdapter(new JacksonAdapter())
		    .withInterceptor(new PictureparkHeaderAppender())
		  	.build();
	}
}
