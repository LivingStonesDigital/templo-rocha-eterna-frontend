import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  Phone, 
  Mail, 
  Calendar, 
  MapPin,
  Users,
  Award,
  TrendingUp,
  Clock,
  Gift,
  CheckCircle
} from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { ThemeToggle } from '@/components/ThemeToggle';

type AttendanceRecord = {
  id: string;
  date: string;
  service: string;
  present: boolean;
};

type BirthdayHistory = {
  id: string;
  year: number;
  celebrated: boolean;
  notes: string;
};

export default function MemberDetailScreen() {
  const router = useRouter();
  
  // Mock member data - in real app, this would come from route params
  const member = {
    id: '1',
    name: 'Sarah Johnson',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=900&auto=format&fit=crop&q=60',
    birthday: 'March 15, 1985',
    age: 39,
    phone: '(555) 123-4567',
    email: 'sarah.j@email.com',
    address: '123 Faith Street, Grace City, ST 12345',
    joinDate: 'January 10, 2018',
    ministry: 'Worship',
    group: 'Choir',
    additionalMinistries: ['Media', 'Prayer'],
    baptismDate: 'March 5, 2018',
    membershipStatus: 'Active',
    emergencyContact: 'John Johnson - (555) 123-4568',
  };

  const attendanceRecords: AttendanceRecord[] = [
    { id: '1', date: 'Dec 24, 2023', service: 'Christmas Eve Service', present: true },
    { id: '2', date: 'Dec 17, 2023', service: 'Sunday Morning Worship', present: true },
    { id: '3', date: 'Dec 10, 2023', service: 'Sunday Morning Worship', present: true },
    { id: '4', date: 'Dec 3, 2023', service: 'Sunday Morning Worship', present: false },
    { id: '5', date: 'Nov 26, 2023', service: 'Thanksgiving Service', present: true },
  ];

  const birthdayHistory: BirthdayHistory[] = [
    { id: '1', year: 2023, celebrated: true, notes: 'Church-wide celebration with cake' },
    { id: '2', year: 2022, celebrated: true, notes: 'Card and flowers from worship team' },
    { id: '3', year: 2021, celebrated: true, notes: 'Virtual celebration during COVID' },
    { id: '4', year: 2020, celebrated: false, notes: 'Missed due to travel' },
  ];

  const attendanceRate = 85; // Percentage

  const handleEdit = () => {
    Alert.alert('Edit Member', 'Navigate to edit member screen');
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Member',
      'Are you sure you want to remove this member from the directory?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            Alert.alert('Success', 'Member removed from directory');
            router.back();
          }
        },
      ]
    );
  };

  const handleCall = () => {
    Alert.alert('Call', `Calling ${member.phone}`);
  };

  const handleEmail = () => {
    Alert.alert('Email', `Sending email to ${member.email}`);
  };

  const handleSendWishes = () => {
    Alert.alert('Birthday Wishes', `Send birthday wishes to ${member.name}`);
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 py-4 border-b border-border">
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft className="text-foreground" size={24} />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-foreground">Member Profile</Text>
        <View className="flex-row items-center gap-3">
          <TouchableOpacity onPress={handleEdit}>
            <Edit className="text-primary" size={22} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete}>
            <Trash2 className="text-destructive" size={22} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 128 }}>
        {/* Profile Header */}
        <View className="items-center py-6 px-6">
          <Image
            source={{ uri: member.photo }}
            className="w-32 h-32 rounded-full mb-4"
          />
          <Text className="text-2xl font-bold text-foreground">{member.name}</Text>
          <View className="flex-row items-center gap-2 mt-2">
            <View className="bg-primary/10 px-3 py-1 rounded-full">
              <Text className="text-primary font-semibold text-sm">{member.ministry}</Text>
            </View>
            <View className="bg-secondary px-3 py-1 rounded-full">
              <Text className="text-secondary-foreground font-semibold text-sm">{member.group}</Text>
            </View>
          </View>
          <View className="flex-row items-center gap-2 mt-3">
            <View className={`w-2 h-2 rounded-full ${member.membershipStatus === 'Active' ? 'bg-green-500' : 'bg-yellow-500'}`} />
            <Text className="text-muted-foreground">{member.membershipStatus} Member</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="flex-row px-6 gap-3 mb-6">
          <TouchableOpacity 
            onPress={handleCall}
            className="flex-1 bg-primary py-3 rounded-lg flex-row items-center justify-center gap-2"
          >
            <Phone className="text-primary-foreground" size={18} />
            <Text className="text-primary-foreground font-semibold">Call</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={handleEmail}
            className="flex-1 bg-secondary py-3 rounded-lg flex-row items-center justify-center gap-2"
          >
            <Mail className="text-secondary-foreground" size={18} />
            <Text className="text-secondary-foreground font-semibold">Email</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={handleSendWishes}
            className="flex-1 bg-accent py-3 rounded-lg flex-row items-center justify-center gap-2"
          >
            <Gift className="text-accent-foreground" size={18} />
            <Text className="text-accent-foreground font-semibold">Wishes</Text>
          </TouchableOpacity>
        </View>

        {/* Contact Information */}
        <View className="px-6 mb-6">
          <View className="flex-row items-center gap-2 mb-4">
            <Phone className="text-primary" size={20} />
            <Text className="text-lg font-bold text-foreground">Contact Information</Text>
          </View>
          <View className="bg-card border border-border rounded-lg p-4 gap-3">
            <View className="flex-row items-start gap-3">
              <Phone className="text-muted-foreground mt-1" size={16} />
              <View className="flex-1">
                <Text className="text-xs text-muted-foreground mb-1">Phone</Text>
                <Text className="text-foreground">{member.phone}</Text>
              </View>
            </View>
            <View className="flex-row items-start gap-3">
              <Mail className="text-muted-foreground mt-1" size={16} />
              <View className="flex-1">
                <Text className="text-xs text-muted-foreground mb-1">Email</Text>
                <Text className="text-foreground">{member.email}</Text>
              </View>
            </View>
            <View className="flex-row items-start gap-3">
              <MapPin className="text-muted-foreground mt-1" size={16} />
              <View className="flex-1">
                <Text className="text-xs text-muted-foreground mb-1">Address</Text>
                <Text className="text-foreground">{member.address}</Text>
              </View>
            </View>
            <View className="flex-row items-start gap-3">
              <Phone className="text-muted-foreground mt-1" size={16} />
              <View className="flex-1">
                <Text className="text-xs text-muted-foreground mb-1">Emergency Contact</Text>
                <Text className="text-foreground">{member.emergencyContact}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Birthday & Membership Info */}
        <View className="px-6 mb-6">
          <View className="flex-row items-center gap-2 mb-4">
            <Calendar className="text-primary" size={20} />
            <Text className="text-lg font-bold text-foreground">Important Dates</Text>
          </View>
          <View className="bg-card border border-border rounded-lg p-4 gap-3">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <Gift className="text-primary" size={18} />
                <View>
                  <Text className="text-xs text-muted-foreground">Birthday</Text>
                  <Text className="text-foreground font-semibold">{member.birthday}</Text>
                </View>
              </View>
              <View className="bg-primary/10 px-3 py-1 rounded-full">
                <Text className="text-primary font-semibold text-sm">{member.age} years</Text>
              </View>
            </View>
            <View className="h-px bg-border" />
            <View className="flex-row items-center gap-3">
              <Calendar className="text-muted-foreground" size={18} />
              <View>
                <Text className="text-xs text-muted-foreground">Joined Church</Text>
                <Text className="text-foreground font-semibold">{member.joinDate}</Text>
              </View>
            </View>
            <View className="flex-row items-center gap-3">
              <Award className="text-muted-foreground" size={18} />
              <View>
                <Text className="text-xs text-muted-foreground">Baptism Date</Text>
                <Text className="text-foreground font-semibold">{member.baptismDate}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Ministry Involvement */}
        <View className="px-6 mb-6">
          <View className="flex-row items-center gap-2 mb-4">
            <Users className="text-primary" size={20} />
            <Text className="text-lg font-bold text-foreground">Ministry Involvement</Text>
          </View>
          <View className="bg-card border border-border rounded-lg p-4">
            <View className="mb-3">
              <Text className="text-xs text-muted-foreground mb-2">Primary Ministry</Text>
              <View className="bg-primary/10 px-3 py-2 rounded-lg self-start">
                <Text className="text-primary font-semibold">{member.ministry}</Text>
              </View>
            </View>
            <View className="mb-3">
              <Text className="text-xs text-muted-foreground mb-2">Small Group</Text>
              <View className="bg-secondary px-3 py-2 rounded-lg self-start">
                <Text className="text-secondary-foreground font-semibold">{member.group}</Text>
              </View>
            </View>
            <View>
              <Text className="text-xs text-muted-foreground mb-2">Additional Ministries</Text>
              <View className="flex-row flex-wrap gap-2">
                {member.additionalMinistries.map((ministry, index) => (
                  <View key={index} className="bg-accent/20 px-3 py-2 rounded-lg">
                    <Text className="text-accent-foreground font-medium text-sm">{ministry}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* Attendance Stats */}
        <View className="px-6 mb-6">
          <View className="flex-row items-center gap-2 mb-4">
            <TrendingUp className="text-primary" size={20} />
            <Text className="text-lg font-bold text-foreground">Attendance</Text>
          </View>
          <View className="bg-card border border-border rounded-lg p-4 mb-3">
            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-muted-foreground">Attendance Rate</Text>
              <Text className="text-2xl font-bold text-primary">{attendanceRate}%</Text>
            </View>
            <View className="h-2 bg-muted rounded-full overflow-hidden">
              <View 
                className="h-full bg-primary rounded-full" 
                style={{ width: `${attendanceRate}%` }}
              />
            </View>
          </View>
          <View className="bg-card border border-border rounded-lg p-4 gap-2">
            <Text className="text-sm font-semibold text-foreground mb-2">Recent Attendance</Text>
            {attendanceRecords.map((record) => (
              <View key={record.id} className="flex-row items-center justify-between py-2">
                <View className="flex-1">
                  <Text className="text-foreground font-medium">{record.service}</Text>
                  <Text className="text-xs text-muted-foreground">{record.date}</Text>
                </View>
                {record.present ? (
                  <CheckCircle className="text-green-500" size={20} />
                ) : (
                  <View className="w-5 h-5 rounded-full border-2 border-muted" />
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Birthday History */}
        <View className="px-6 mb-6">
          <View className="flex-row items-center gap-2 mb-4">
            <Gift className="text-primary" size={20} />
            <Text className="text-lg font-bold text-foreground">Birthday History</Text>
          </View>
          <View className="bg-card border border-border rounded-lg p-4 gap-3">
            {birthdayHistory.map((history, index) => (
              <View key={history.id}>
                {index > 0 && <View className="h-px bg-border mb-3" />}
                <View className="flex-row items-start gap-3">
                  <View className="bg-primary/10 w-12 h-12 rounded-full items-center justify-center">
                    <Text className="text-primary font-bold">{history.year}</Text>
                  </View>
                  <View className="flex-1">
                    <View className="flex-row items-center gap-2 mb-1">
                      {history.celebrated ? (
                        <>
                          <CheckCircle className="text-green-500" size={16} />
                          <Text className="text-foreground font-semibold">Celebrated</Text>
                        </>
                      ) : (
                        <>
                          <Clock className="text-muted-foreground" size={16} />
                          <Text className="text-muted-foreground font-semibold">Not Celebrated</Text>
                        </>
                      )}
                    </View>
                    <Text className="text-sm text-muted-foreground">{history.notes}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}