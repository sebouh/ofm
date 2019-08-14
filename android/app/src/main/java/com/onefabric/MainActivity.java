package com.onefabric;

import android.content.pm.ActivityInfo;
import android.os.Bundle;

import com.facebook.react.ReactActivity;

import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {
    @Override
    protected void onCreate(Bundle savedInstance) {
        SplashScreen.show(this);
        super.onCreate(savedInstance);

        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "OneFabric";
    }
}
