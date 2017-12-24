package com.awesomeproject;

import android.app.Application;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import java.io.File;
import java.util.Arrays;
import java.util.List;
import javax.annotation.Nullable;

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
}
