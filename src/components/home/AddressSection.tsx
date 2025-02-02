import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  FlatList,
} from 'react-native';
import React, {FC, useState} from 'react';
import Modal from 'react-native-modal';
import Icons from '@components/global/Icons';
import CustomText from '@components/global/CustomText';
import {screenHeight} from '../../../unistyles/Constants';
import {RFValue} from 'react-native-responsive-fontsize';
import {Icon} from 'react-native-vector-icons/Icon';

interface AddressType {
  type: string;
  distance: string;
  address: string;
  phoneNumber: string;
}

const SAMPLE_ADDRESSES: AddressType[] = [
  {
    type: 'Home',
    distance: '0 m',
    address: 'Oto royal win, gali no 10, Hazipur, Sector 104, Noida',
    phoneNumber: '+91-9915363698',
  },
  {
    type: 'Home',
    distance: '2.4 km',
    address:
      'Floor 3, room 303, Super townhouse 204, Sector 49, Noida, Hanuman Vihar, Sector 49, Noida',
    phoneNumber: '+91-9915363698',
  },
  {
    type: 'Home',
    distance: '0 m',
    address: 'Oto royal win, gali no 10, Hazipur, Sector 104, Noida',
    phoneNumber: '+91-9915363698',
  },
  {
    type: 'Home',
    distance: '2.4 km',
    address:
      'Floor 3, room 303, Super townhouse 204, Sector 49, Noida, Hanuman Vihar, Sector 49, Noida',
    phoneNumber: '+91-9915363698',
  },
  {
    type: 'Home',
    distance: '0 m',
    address: 'Oto royal win, gali no 10, Hazipur, Sector 104, Noida',
    phoneNumber: '+91-9915363698',
  },
  {
    type: 'Home',
    distance: '2.4 km',
    address:
      'Floor 3, room 303, Super townhouse 204, Sector 49, Noida, Hanuman Vihar, Sector 49, Noida',
    phoneNumber: '+91-9915363698',
  },
  {
    type: 'Home',
    distance: '0 m',
    address: 'Oto royal win, gali no 10, Hazipur, Sector 104, Noida',
    phoneNumber: '+91-9915363698',
  },
  {
    type: 'Home',
    distance: '2.4 km',
    address:
      'Floor 3, room 303, Super townhouse 204, Sector 49, Noida, Hanuman Vihar, Sector 49, Noida',
    phoneNumber: '+91-9915363698',
  },
  {
    type: 'Hotel',
    distance: '3 km',
    address: 'room 108, Culture hotel, H Block, Chhalera',
    phoneNumber: '+91-9915363698',
  },
];

const AddressSelectionModal: FC<{
  isVisible: boolean;
  onClose: () => void;
}> = ({isVisible, onClose}) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0.5}
      backdropTransitionInTiming={300}
      backdropTransitionOutTiming={300}
      style={styles.modal}>
      <View style={styles.modalContent}>
        <View style={styles.header}>
          <CustomText style={styles.headerTitle}>Select an address</CustomText>
          <TouchableOpacity onPress={onClose}>
            <Icons
              name="close"
              iconFamily="MaterialCommunityIcons"
              size={24}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
        <FlatList
          data={SAMPLE_ADDRESSES}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <TouchableOpacity style={styles.addressCard}>
              <View style={styles.addressCardContent}>
                <CustomText color="#fff" fontSize={10}>
                  DELIVERS TO
                </CustomText>
                <View style={styles.addressInfo}>
                  <View style={styles.iconContainer}>
                    <Icons
                      name={
                        item.type.toLowerCase() === 'home' ? 'home' : 'business'
                      }
                      iconFamily="MaterialCommunityIcons"
                      size={RFValue(20)}
                      color="#fff"
                    />
                    <CustomText color="#fff" fontSize={10}>
                      {item.distance}
                    </CustomText>
                  </View>
                  <View style={styles.addressTextContainer}>
                    <CustomText
                      color="#fff"
                      fontSize={12}
                      fontFamily="Okra-Bold"
                      style={styles.addressType}>
                      {item.type}
                    </CustomText>
                    <CustomText color="#fff" fontSize={8}>
                      {item.address}
                    </CustomText>
                    <CustomText color="#fff" fontSize={8}>
                      {item.phoneNumber}
                    </CustomText>
                    <View style={{padding: 5}}>
                      <TouchableOpacity
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 5,
                        }}>
                        <Icons
                          name="ellipsis-horizontal-sharp"
                          iconFamily="Ionicons"
                          size={20}
                          color="#fff"
                        />
                        <Icons
                          name="share"
                          size={24}
                          iconFamily="MaterialCommunityIcons"
                          color="#fff"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
          ListHeaderComponent={
            <>
              <View style={styles.addAddressSection}>
                <TouchableOpacity style={styles.addAddressButton}>
                  <Icons
                    name="plus"
                    iconFamily="MaterialCommunityIcons"
                    size={24}
                    color="#FF424E"
                  />
                  <CustomText style={styles.addAddressText}>
                    Add address
                  </CustomText>
                  <View style={styles.chevronRight}>
                    <Icons
                      name="chevron-right"
                      iconFamily="MaterialCommunityIcons"
                      size={24}
                      color="#666"
                    />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.importSection}>
                  <View style={styles.importLeft}>
                    <View style={styles.blinkitLogo}>
                      {/* Replace with your Blinkit logo component */}
                      <View style={styles.logoPlaceholder} />
                    </View>
                    <View>
                      <CustomText style={styles.importTitle}>
                        Import addresses from Blinkit
                      </CustomText>
                      <CustomText style={styles.importSubtitle}>
                        Get saved addresses in one click
                      </CustomText>
                    </View>
                  </View>
                  <CustomText style={styles.importButton}>Import</CustomText>
                </TouchableOpacity>
              </View>

              <View style={styles.savedAddressesSection}>
                <View style={{alignItems: 'center', padding: 10}}>
                  <CustomText
                    fontFamily="Okra-Bold"
                    fontSize={16}
                    color="#fff"
                    style={styles.savedAddressesTitle}>
                    SAVED ADDRESSES
                  </CustomText>
                </View>
              </View>
            </>
          }
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#1C1C1E',
    height: screenHeight * 0.7,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2C2C2E',
  },
  headerTitle: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600' as '600',
  },
  addAddressSection: {
    padding: 16,
  },
  iconContainer: {
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'flex-start',
  },
  addAddressButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2C2C2E',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  addressCardContent: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 8,
  },
  addressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    gap: 10,
  },
  addressTextContainer: {
    width: '80%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 5,
  },
  addAddressText: {
    color: '#FF424E',
    fontSize: 16,
    marginLeft: 12,
    flex: 1,
  },
  chevronRight: {
    marginLeft: 'auto' as any,
  },
  importSection: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    backgroundColor: '#2C2C2E',
    padding: 16,
    borderRadius: 12,
  },
  importLeft: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    flex: 1,
  },
  blinkitLogo: {
    marginRight: 12,
  },
  logoPlaceholder: {
    width: 40,
    height: 40,
    backgroundColor: '#FFD700',
    borderRadius: 8,
  },
  importTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  importSubtitle: {
    color: '#8E8E93',
    fontSize: 14,
  },
  importButton: {
    color: '#FF424E',
    fontSize: 16,
    fontWeight: 500,
  },
  savedAddressesSection: {
    paddingTop: 16,
  },
  savedAddressesTitle: {
    color: '#8E8E93',
    fontSize: 13,
    fontWeight: 500,
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  addressList: {
    width: '100%',
    maxHeight: 0.7 * 100, // 60% of the parent height
  },
  addressCard: {
    backgroundColor: '#2C2C2E',
    padding: 16,
    marginBottom: 12,
    marginHorizontal: 16,
    borderRadius: 12,
    height: 140,
  },
  addressHeader: {
    marginBottom: 12,
  },
  addressTypeContainer: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    marginRight: 12,
  },
  addressType: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500' as '500',
  },
  distance: {
    color: '#8E8E93',
    fontSize: 14,
  },
  addressText: {
    color: '#8E8E93',
    fontSize: 14,
    marginBottom: 8,
  },
  phoneNumber: {
    color: '#8E8E93',
    fontSize: 14,
    marginBottom: 12,
  },
  addressActions: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#3C3C3E',
  },
});

export default AddressSelectionModal;
