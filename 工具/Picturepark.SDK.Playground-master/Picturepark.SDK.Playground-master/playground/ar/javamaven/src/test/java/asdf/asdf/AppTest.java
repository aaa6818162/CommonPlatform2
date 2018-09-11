package asdf.asdf;

import java.io.IOException;

import com.microsoft.rest.RestClient;
import com.microsoft.rest.RestException;
import com.microsoft.rest.ServiceResponseBuilder;
import com.microsoft.rest.protocol.ResponseBuilder;
import com.microsoft.rest.protocol.SerializerAdapter;
import com.microsoft.rest.serializer.JacksonAdapter;

import foobar.implementation.WebAPISwaggerspecificationImpl;
import junit.framework.Test;
import junit.framework.TestCase;
import junit.framework.TestSuite;
import okhttp3.Interceptor;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import retrofit2.Retrofit;

/**
 * Unit test for simple App.
 */
public class AppTest 
    extends TestCase
{
    /**
     * Create the test case
     *
     * @param testName name of the test case
     */
    public AppTest( String testName )
    {
        super( testName );
    }

    /**
     * @return the suite of tests being tested
     */
    public static Test suite()
    {
        return new TestSuite( AppTest.class );
    }

    /**
     * Rigourous Test :-)
     */
    public void testApp()
    {
    	class EnglishGreeting implements Interceptor {

			public Response intercept(Chain chain) throws IOException {
			    Request request = chain.request();
			    request = request.newBuilder().addHeader("Picturepark-CustomerAlias", "localtest").build();			    
			    request = request.newBuilder().addHeader("Accept", "application/json").build();			    
			    Response response = chain.proceed(request);
			    // String y = response.body().string();
			    return response;
			}

        }

    	RestClient rc = new RestClient.Builder(new OkHttpClient.Builder(), new Retrofit.Builder())
                .withResponseBuilderFactory(new ServiceResponseBuilder.Factory())
    		    .withBaseUrl("https://qanext04-api.preview-picturepark.com")
                .withSerializerAdapter(new JacksonAdapter())
    		    .withInterceptor(new EnglishGreeting())
    		  	.build();
    	WebAPISwaggerspecificationImpl x = new WebAPISwaggerspecificationImpl(rc);
    	Object y = x.publicAccess().getShare("26wxXWbM");
    	
        assertTrue( true );
    }
}
