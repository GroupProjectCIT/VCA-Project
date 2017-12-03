package com.example.android.careassistant;
import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import java.util.ArrayList;
/**
 * Created by DarraghFinn on 03/12/2017.
 */

public class DbHelper extends SQLiteOpenHelper {
    private static String DB_NAME = "JUSTPC";
    private static final int DB_VER = 1;
    public  static  final String DB_TABLE =  "Task";
    public static final String  DB_COLUMN = "TaskName";
    public DbHelper(Context context) {
        super(context,DB_NAME,null,DB_VER);
    }
    @Override
    public void onCreate(SQLiteDatabase db) {
        String str = "CREATE TABLE Task (_id INTEGER PRIMARY KEY AUTOINCREMENT, TaskName TEXT NOT NULL);";
        db.execSQL(str);
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        String str = String.format("DELETE TABLE IF EXISTS %s",DB_TABLE);
        db.execSQL(str);
        onCreate(db);
    }

    public void insertNewTask(String task){
        SQLiteDatabase db = this.getWritableDatabase();
        ContentValues values = new ContentValues();
        values.put(DB_COLUMN,task);
        db.insert(DB_TABLE,null,values);
        db.close();
    }

    public void deleteTask(String task){
        SQLiteDatabase db = this.getWritableDatabase();
        db.delete(DB_TABLE,"TaskName = ?", new String[] {task});
        db.close();
    }

    public ArrayList<String> getTaskList(){
        ArrayList<String> taskList = new ArrayList<>();
        SQLiteDatabase db = this.getReadableDatabase();
        Cursor cursor = db.query(DB_TABLE,new String[]{DB_COLUMN},null,null,null,null,null);
        int index = cursor.getColumnIndex(DB_COLUMN);
        while(cursor.moveToNext()){
            taskList.add(cursor.getString(index));
        }
        cursor.close();
        db.close();
        return taskList;
    }
}