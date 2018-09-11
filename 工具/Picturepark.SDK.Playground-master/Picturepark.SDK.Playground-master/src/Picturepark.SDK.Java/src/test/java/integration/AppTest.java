package integration;

import com.microsoft.rest.RestClient;

import picturepark.WebAPISwaggerspecification;
import picturepark.implementation.PictureparkAPIV1Impl;
import picturepark.models.ShareDetail;
import junit.framework.Test;
import junit.framework.TestCase;
import junit.framework.TestSuite;

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
    	RestClient restClient = PictureparkRestClient.Create("https://devnext-api.preview-picturepark.com", "dev"); 	
    	PictureparkAPIV1Impl client = new PictureparkAPIV1Impl(restClient);
    	ShareDetail share = client.publicAccessClients().getShare("SEnjSGHM");
    	
        assertTrue( share.getClass() == ShareDetail.class );
    }
}
