package io.swagger.client;
import java.util.List;
import java.util.Map;

import com.squareup.okhttp.Call;

public class AuthClient extends ApiClient {
	private String customerAlias;
	
	public AuthClient(String pictureparkApiUrl, String customerAlias) {
		this.customerAlias = customerAlias;
		this.setBasePath(pictureparkApiUrl);
	}
	
    public Call buildCall(String path, String method, List<Pair> queryParams, Object body, Map<String, String> headerParams, Map<String, Object> formParams, String[] authNames, ProgressRequestBody.ProgressRequestListener progressRequestListener) throws ApiException {
        headerParams.put("Picturepark-CustomerAlias", this.customerAlias);
        return super.buildCall(path, method, queryParams, body, headerParams, formParams, authNames, progressRequestListener);
    }
}
