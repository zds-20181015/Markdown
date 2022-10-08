package com.group.markdownnote.utils;

import android.content.Context;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.group.markdownnote.R;

public class ToastUtils {

    ////带自定义好的图片提示
    public static void showToast(Context mContext, String text) {
        LayoutInflater inflater = LayoutInflater.from(mContext);
        View view = inflater.inflate(R.layout.toast_view, null);
        ImageView imageView = view.findViewById(R.id.toast_image);
        imageView.setBackgroundResource(R.mipmap.my_toast);
        TextView t = view.findViewById(R.id.toast_text);
        t.setText(text);
        Toast toast = null;
        if (toast != null) {
            toast.cancel();
        }
        toast = new Toast(mContext);
        toast.setDuration(Toast.LENGTH_SHORT);
        toast.setGravity(Gravity.CENTER, 0, 0);
        toast.setView(view);
        toast.show();
    }

     //不带图片的提示
    public static void showToastNoImage(Context mContext, String text) {
        LayoutInflater inflater = LayoutInflater.from(mContext);
        View view = inflater.inflate(R.layout.toast_view, null);
        ImageView imageView = view.findViewById(R.id.toast_image);
        imageView.setVisibility(View.GONE);
        TextView t = view.findViewById(R.id.toast_text);
        t.setText(text);
        Toast toast = null;
        if (toast != null) {
            toast.cancel();
        }
        toast = new Toast(mContext);
        toast.setDuration(Toast.LENGTH_SHORT);
        toast.setGravity(Gravity.CENTER, 0, 0);
        toast.setView(view);
        toast.show();
    }
}
