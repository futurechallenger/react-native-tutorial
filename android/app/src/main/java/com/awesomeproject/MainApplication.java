package com.awesomeproject;

import android.app.Application;
import android.util.Log;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.List;
import javax.annotation.Nullable;
import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.Headers;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new CustomReactNativeHost(this);

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);

    // Download patch from server
    downloadHotPatch();
  }

  static class CustomReactNativeHost extends ReactNativeHost {

    protected CustomReactNativeHost(Application application) {
      super(application);
    }

    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }

    @Nullable
    @Override
    protected String getJSBundleFile() {
      String jsBundleFile =
          getApplication().getFilesDir().getAbsolutePath() + "/index.android.bundle";
      File file = new File(jsBundleFile);
      if (file == null || !file.exists()) {
        return super.getJSBundleFile();
      }
      return jsBundleFile;
    }
  }

  private void downloadHotPatch() {
    OkHttpClient client = new OkHttpClient();

    Request request = new Request.Builder()
        .url("http://localhost:3033/patch/download")
        .build();

    client.newCall(request).enqueue(new Callback() {
      @Override
      public void onFailure(Call call, IOException e) {
        e.printStackTrace();
      }

      @Override
      public void onResponse(Call call, Response response) throws IOException {

        if (!response.isSuccessful()) {
          throw new IOException("Unexpected code " + response);
        }

        // Debug info, remove it in production env.
        Headers responseHeaders = response.headers();
        for (int i = 0; i < responseHeaders.size(); i++) {
          Log.i("HOT PATCH", responseHeaders.name(i) + ": " + responseHeaders.value(i));
        }
        Log.i("HOT PATCH", response.body().string());
        // End of debug info

        InputStream in = response.body().byteStream();
        BufferedReader reader = new BufferedReader(new InputStreamReader(in));
        String result, line = reader.readLine();
        result = line;
        while ((line = reader.readLine()) != null) {
          result += line;
        }

        Log.i("HOT PATCH", result);
      }
    });
  }
}
