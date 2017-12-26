package com.awesomeproject;

import android.app.Application;
<<<<<<< HEAD

=======
>>>>>>> 66ae2b2... native-baser
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
<<<<<<< HEAD

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
=======
import java.io.File;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import javax.annotation.Nullable;
import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import okio.Buffer;
import okio.BufferedSink;
import okio.BufferedSource;
import okio.Okio;

public class MainApplication extends Application implements ReactApplication {

  /*
   * Hot patch js bundle file
   */
  private String jsBundleFile = null;
  private final ReactNativeHost mReactNativeHost = new CustomReactNativeHost(this);

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);

    jsBundleFile = this.getFilesDir().getAbsolutePath() + "/index.android.bundle";
    // Download patch from server
    downloadHotPatch();
  }

  static class CustomReactNativeHost extends ReactNativeHost {

    protected CustomReactNativeHost(Application application) {
      super(application);
    }

>>>>>>> 66ae2b2... native-baser
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
  };

<<<<<<< HEAD
  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
=======
    @Nullable
    @Override
    protected String getJSBundleFile() {
      String jsBundleFile
          = ((MainApplication) getApplication()).getApplicationContext().getFilesDir()
          .getAbsolutePath() + "/index.android.bundle";
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
        .url("http://10.0.2.2:3033/patch/download")
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

        BufferedSource source = response.body().source();
        File destFile = new File(getApplicationContext().getFilesDir()
            .getAbsolutePath() + "/index.android.bundle");
        BufferedSink sink = Okio.buffer(Okio.sink(destFile));
        Buffer sinkBuffer = sink.buffer();

        long totalBytesRead = 0;
        int bufferSize = 8 * 1024;
        for (long bytesRead; (bytesRead = source.read(sinkBuffer, bufferSize)) != -1; ) {
          sink.emit();
          totalBytesRead += bytesRead;
        }
        sink.flush();
        sink.close();
        source.close();
      }
    });
>>>>>>> 66ae2b2... native-baser
  }
}
